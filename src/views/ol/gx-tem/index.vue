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
import Regioncoord from '../../../util/mapBorder/gx';
export default {
  name: 'ol-gx',
  components: {},
  mounted() {
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
          center: [108.22, 22.48],
          projection: 'EPSG:4326',
          zoom: 7
        })
      });
      fetch('/data/TEM.json').then(response => {
        response.json().then(res => {
          const data = res.data;
          this.contourInit(map, data);
        });
      });
    },
    contourInit(map, origindata) {
      const canvasLayer = new Image({
        source: new ImageCanvas({
          canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
            const [width, height] = size;
            // const _map = map;
            // const mapsize = _map.getSize();
            // const width = mapsize[0];
            // const height = mapsize[1];
            const [left, bottom, right, top] = extent;
            const xscale = width / (right - left);
            const yscale = height / (top - bottom);
            const pxregion = getPxRegion(Regioncoord, xscale, yscale, top, left);
            const cw = Math.ceil(pxregion.xmax - pxregion.xmin);
            const ch = Math.ceil(pxregion.ymax - pxregion.ymin);
            // const cw = Math.ceil(pxregion.xmax)
            // const ch = Math.ceil(pxregion.ymax)

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
            // const idwdata = [];
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
            for (let i = 0; i < Regioncoord.length; i++) {
              const rp = coordToPoint(Regioncoord[i][0], Regioncoord[i][1], xscale, yscale, top, left);
              context.lineTo(rp[0], rp[1]);
            }
            context.closePath();
            context.stroke();
            context.clip();

            context.globalAlpha = 0.3; //设置透明度
            context.lineWidth = 2; //线条宽度

            // 偏移
            context.translate(pxregion.xmin, pxregion.ymin);

            const colors = [
              { max: -30, color: '#020c64' },
              { min: -30, max: -28, color: '#071e78' },
              { min: -28, max: -26, color: '#11318b' },
              { min: -26, max: -24, color: '#1b449f' },
              { min: -24, max: -22, color: '#2657b3' },
              { min: -22, max: -20, color: '#306ac7' },
              { min: -20, max: -18, color: '#3b7edb' },
              { min: -20, max: -18, color: '#3b7edb' },
              { min: -18, max: -16, color: '#4e8add' },
              { min: -16, max: -14, color: '#6196e0' },
              { min: -14, max: -12, color: '#74a3e2' },
              { min: -12, max: -10, color: '#87afe5' },
              { min: -10, max: -8, color: '#9bbce8' },
              { min: -8, max: -6, color: '#9ac4dc' },
              { min: -6, max: -4, color: '#99cdd0' },
              { min: -4, max: -2, color: '#98d6c4' },
              { min: -2, max: 0, color: '#97e8ad' },
              { min: 0, max: 2, color: '#d7de7e' },
              { min: 2, max: 4, color: '#eadb70' },
              { min: 4, max: 6, color: '#f4d963' },
              { min: 6, max: 8, color: '#facc4f' },
              { min: 8, max: 10, color: '#f7b42d' },
              { min: 10, max: 12, color: '#f29b00' },
              { min: 12, max: 14, color: '#f19303' },
              { min: 14, max: 16, color: '#f0840a' },
              { min: 16, max: 18, color: '#ef7511' },
              { min: 18, max: 20, color: '#ee6618' },
              { min: 20, max: 22, color: '#ee581f' },
              { min: 22, max: 24, color: '#e74b1a' },
              { min: 24, max: 26, color: '#e03f16' },
              { min: 26, max: 28, color: '#d93312' },
              { min: 28, max: 30, color: '#d0240e' },
              { min: 30, max: 32, color: '#c20003' },
              { min: 32, max: 34, color: '#b50109' },
              { min: 34, max: 35, color: '#a90210' },
              { min: 35, max: 37, color: '#8a0519' },
              { min: 37, max: 40, color: '#6f0015' },
              { min: 40, color: '#6f0015' }
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
                const p = coordToPoint(data[i].Lon, data[i].Lat, xscale, yscale, top, left);
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
                    value: Number(data[i].TEM)
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

            function pointToCoord(px, py, xscale, yscale, top, left) {
              const x = px / xscale + left;
              const y = top - py / yscale;
              return [x, y];
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
                if (value > colors[i].min && value <= colors[i].max) {
                  const color = colorRGB(colors[i].color);
                  return d3.rgb(color[0], color[1], color[2]);
                }
              }
            }

            function colorRGB(color) {
              let sColor = color.toLowerCase();
              // 处理六位的颜色值
              const sColorChange = [];
              // 十六进制颜色值的正则表达式
              const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
              // 如果是16进制颜色
              if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                  let sColorNew = '#';
                  for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                  }
                  sColor = sColorNew;
                }

                for (let i = 1; i < 7; i += 2) {
                  sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
                }
              }
              return sColorChange;
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
html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}
#olmap {
  width: 100%;
  height: 100%;
}
</style>
