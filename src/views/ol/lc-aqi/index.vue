<template>
  <div id="olmap"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';
import Image from 'ol/layer/Image';
import ImageCanvas from 'ol/source/ImageCanvas';
import * as d3 from 'd3';
import * as DC from 'd3-contour';
import Regioncoord from '../../../util/mapBorder/lc';
export default {
  name: 'ol-lc',
  components: {},
  mounted() {
    console.log('mounted');
    this.mapInit();
  },
  methods: {
    mapInit() {
      const layers = [
        new TileLayer({
          source: new OSM()
        })
      ];

      const map = new Map({
        layers: layers,
        target: 'olmap',
        view: new View({
          center: [115.79, 36.142],
          projection: 'EPSG:4326',
          zoom: 8
        })
      });
      fetch('/data/aqi.json').then(response => {
        response.json().then(res => {
          const data = res.data;
          this.contourInit(map, data);
        });
      });
    },
    contourInit(map, origindata) {
      // TODO
      // 1.zoom大时，PXregion异常
      // 2.等值线添加label
      // 3.引入webworker 多线程计算
      // 4.idw插值算法优化的思路
      // （1）画布以（0，0）为起点 xmax => width , ymax => height
      // 1）直接在region的extent里计算
      // 2）直接在region里插值计算（需要判断空间关系，范围内计算，范围外不计算）
      // （2）画布以（xmin,ymin)为起点 xmax-xmin => width , ymax-ymin => height
      // 3）region的extent(xmax-xmin,ymax-ymin)计算插值，然后canvas偏移至（xmin,ymin)
      const canvasLayer = new Image({
        source: new ImageCanvas({
          canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
            const [width, height] = size;
            const [left, bottom, right, top] = extent;
            const xscale = width / (right - left);
            const yscale = height / (top - bottom);
            const pxregion = getPxRegion(Regioncoord, xscale, yscale, top, left);
            const cw = Math.ceil(pxregion.xmax - pxregion.xmin);
            const ch = Math.ceil(pxregion.ymax - pxregion.ymin);

            const regionTopLeft = pointToCoord(pxregion.xmin, pxregion.ymin, xscale, yscale, top, left);
            const _left = regionTopLeft[0];
            const _top = regionTopLeft[1];

            const regionBottomRight = pointToCoord(pxregion.xmax, pxregion.ymax, xscale, yscale, top, left);
            const _right = regionBottomRight[0];
            const _bottom = regionBottomRight[1];

            // 这里是canvas分辨率
            const _xscale = cw / (_right - _left);
            const _yscale = ch / (_top - _bottom);

            const pxdata = getPxData(origindata, _xscale, _yscale, _top, _left);

            const idwdata = olIDW(pxdata.data, cw, ch);
            let canvas = document.createElement('canvas');
            canvas.width = Math.ceil(pxregion.xmax);
            canvas.height = Math.ceil(pxregion.ymax);
            canvas.style.display = 'block';
            //设置canvas透明度
            canvas.getContext('2d').globalAlpha = 0.1;
            let context = canvas.getContext('2d');
            let contours = DC.contours().size([cw, ch]); //等高线绘图实例
            let d3Path = d3.geoPath(null, context); //绘图笔
            context.clearRect(0, 0, cw, ch);
            // 绘制裁剪区
            context.beginPath();
            for (let i = 0; i < pxregion.data.length; i++) {
              const rp = pxregion.data[i];
              context.lineTo(rp.x, rp.y);
            }
            context.closePath();
            context.stroke();
            context.clip();

            context.globalAlpha = 0.3; //设置透明度
            context.lineWidth = 2; //线条宽度

            // 偏移
            context.translate(pxregion.xmin, pxregion.ymin);

            const colors = [
              { min: 0, max: 50, color: [0, 229, 0] },
              { min: 50, max: 100, color: [255, 255, 0] },
              { min: 100, max: 150, color: [255, 126, 0] },
              { min: 150, max: 200, color: [254, 0, 0] },
              { min: 200, max: 250, color: [152, 0, 75] },
              { min: 250, max: 300, color: [126, 1, 35] }
            ];

            //绘图登高线图
            contours
              .thresholds(10)(idwdata)
              .forEach(fill);

            //绘图一条等高线
            function fill(geometry) {
              context.beginPath();
              d3Path(geometry);
              console.log(geometry.value);
              var acolor = getColor(colors, geometry.value);

              //等高线梯度着色
              context.fillStyle = acolor;
              context.fill();

              //等高线线条
              context.strokeStyle = acolor;
              context.stroke();
            }

            // 获取样本数据的屏幕坐标
            function getPxData(data, xscale, yscale, top, left) {
              const me = this;
              const _data = [];
              let xmax = 0;
              let ymax = 0;
              let xmin = 9999;
              let ymin = 9999;
              let len = data.length;
              for (let i = 0; i < len; i++) {
                const p = coordToPoint(data[i].lon, data[i].lat, xscale, yscale, top, left);
                if (i === 0) {
                  xmax = p[0];
                  ymax = p[1];
                }
                if (p[0] != 0 || p[1] != 0) {
                  xmax > p[0] ? null : (xmax = p[0]);
                  ymax > p[1] ? null : (ymax = p[1]);
                  xmin < p[0] ? null : (xmin = p[0]);
                  ymin < p[1] ? null : (ymin = p[1]);
                  _data.push({
                    x: p[0],
                    y: p[1],
                    value: Number(data[i].AQI)
                  });
                }
              }
              return {
                data: _data,
                xmax: xmax,
                ymax: ymax,
                xmin: xmin,
                ymin: ymin
              };
            }

            // 获取裁剪区域的屏幕坐标
            function getPxRegion(data, xscale, yscale, top, left) {
              const me = this;
              const _data = [];
              let xmax = 0;
              let ymax = 0;
              let xmin = 9999;
              let ymin = 9999;
              for (let i = 0; i < data.length; i++) {
                const p = coordToPoint(data[i][0], data[i][1], xscale, yscale, top, left);
                if (i === 0) {
                  xmax = p[0];
                  ymax = p[1];
                }
                if (p[0] != 0 || p[1] != 0) {
                  xmax > p[0] ? null : (xmax = p[0]);
                  ymax > p[1] ? null : (ymax = p[1]);
                  xmin < p[0] ? null : (xmin = p[0]);
                  ymin < p[1] ? null : (ymin = p[1]);
                  _data.push({
                    x: p[0],
                    y: p[1]
                  });
                }
              }
              return {
                data: _data,
                xmax: xmax,
                ymax: ymax,
                xmin: xmin,
                ymin: ymin
              };
            }

            function coordToPoint(x, y, xscale, yscale, top, left) {
              // var px = Math.abs(left - x) * xscale;
              // var py = Math.abs(top - y) * yscale;
              let px = (x - left) * xscale;
              let py = (top - y) * yscale;
              px > 0 ? null : (px = 0);
              py > 0 ? null : (py = 0);
              return [px, py];
            }

            function pointToCoord(px, py, xscale, yscale, top, left) {
              const x = px / xscale + left;
              const y = top - py / yscale;
              return [x, y];
            }

            function olIDW(data, width, height) {
              var s = new Date().getTime();
              var d = data;

              //已有点初始二维数组
              var dlen = d.length;
              var matrixData = [];
              // for (var i = 0; i < dlen; i++) {
              //     var point = d[i];
              //     matrixData[point.y * width + point.x] = point.value;
              // }

              /**
               * 插值矩阵数据,时间复杂度O(height*width*len)
               */
              var idwcount = 0;
              for (var i = 0, k1 = 0; i < height; i++) {
                for (var j = 0; j < width; j++, k1++) {
                  if (!matrixData[k1]) {
                    var sum0 = 0,
                      sum1 = 0;
                    for (var k = 0; k < dlen; k++) {
                      var dk = d[k];
                      var dis = Math.pow(i - dk.y, 2) + Math.pow(j - dk.x, 2);
                      sum0 = sum0 + (dk.value * 1) / dis;
                      sum1 = sum1 + 1 / dis;
                      idwcount++;
                    }
                    if (sum1 != 0)
                      //matrixData[k1] = sum0 / sum1 - referenceValue;
                      matrixData.push(sum0 / sum1);
                    else matrixData.push(1);
                  }
                }
              }
              console.log(idwcount);
              var e = new Date().getTime();
              console.log('插值：' + (e - s) / 1000 + '秒');
              return matrixData;
            }

            function getColor(colors, value) {
              var len = colors.length;
              for (var i = 0; i < len; i++) {
                if (value > colors[i].min && value <= colors[i].max)
                  return d3.rgb(colors[i].color[0], colors[i].color[1], colors[i].color[2]);
              }
            }
            return canvas;
          },
          projection: 'EPSG:4326',
          ratio: 1
        })
      });
      //向map添加图层
      map.addLayer(canvasLayer);
    }
  }
};
</script>

<style>
#olmap {
  width: 100%;
  height: 100%;
}
</style>
