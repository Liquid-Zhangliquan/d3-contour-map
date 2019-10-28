<template>
  <div id="olmap"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import Image from "ol/layer/Image";
import ImageCanvas from "ol/source/ImageCanvas";
import * as d3 from "d3";
import * as DC from "d3-contour";
export default {
  name: "app",
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
        target: "olmap",
        view: new View({
          center: [115.79, 36.142],
          projection: "EPSG:4326",
          zoom: 8
        })
      });
      //定义裁剪边界
      const Regioncoord = [
        [116.05883026123047, 36.88069534301758],
        [116.12857055664074, 36.88832473754883],
        [116.16789245605469, 36.936771392822266],
        [116.20486450195324, 36.9648323059082],
        [116.23371124267578, 37.02350616455084],
        [116.30213165283214, 36.98831558227545],
        [116.32343292236328, 36.970138549804744],
        [116.43280029296886, 36.96689605712896],
        [116.45199584960938, 36.956863403320256],
        [116.45880126953125, 36.934246063232536],
        [116.42424011230469, 36.897548675537166],
        [116.4191665649414, 36.87055206298834],
        [116.38722229003918, 36.796733856201286],
        [116.39975738525402, 36.76072311401367],
        [116.38756561279308, 36.731239318847656],
        [116.40126800537132, 36.70432662963873],
        [116.40677642822266, 36.6568336486817],
        [116.39505004882824, 36.52444839477545],
        [116.44647979736351, 36.493713378906364],
        [116.45575714111328, 36.44969940185541],
        [116.49484252929688, 36.44376754760748],
        [116.54493713378918, 36.40079116821289],
        [116.50951385498047, 36.377944946289176],
        [116.47891998291027, 36.33679962158203],
        [116.44329071044933, 36.336921691894645],
        [116.32552337646484, 36.290496826171875],
        [116.27454376220703, 36.2218589782716],
        [116.20741271972656, 36.169773101806754],
        [116.16371154785156, 36.1711540222168],
        [116.15852355957043, 36.14592742919922],
        [116.1110076904298, 36.12730026245117],
        [116.09490203857422, 36.1111297607423],
        [116.05631256103516, 36.104995727539176],
        [116.01735687255871, 36.06333923339844],
        [115.92543792724621, 36.02585220336914],
        [115.89026641845703, 36.0249404907226],
        [115.85330963134777, 36.0066299438476],
        [115.80311584472656, 36.01005172729498],
        [115.74849700927734, 35.97412109375006],
        [115.68595886230469, 35.96349334716808],
        [115.65953826904308, 35.93789672851568],
        [115.64204406738281, 35.92935180664074],
        [115.58512115478538, 35.92505645751953],
        [115.5428695678711, 35.89764404296881],
        [115.50706481933594, 35.89407730102545],
        [115.44414520263672, 35.86289215087896],
        [115.39887237548828, 35.81025314331066],
        [115.35540771484375, 35.784446716308594],
        [115.33479309082031, 35.80162811279297],
        [115.33245086669933, 35.86394882202154],
        [115.36087036132824, 35.90924835205084],
        [115.34718322753906, 35.94689178466808],
        [115.35207366943371, 35.97102355957031],
        [115.43162536621105, 36.00341796875],
        [115.44813537597656, 36.075164794921875],
        [115.48091888427734, 36.126602172851506],
        [115.47286987304688, 36.16936111450207],
        [115.47711181640625, 36.2026824951173],
        [115.46441650390636, 36.257820129394474],
        [115.4229507446289, 36.28858184814453],
        [115.40888214111351, 36.32630920410156],
        [115.36056518554688, 36.308712005615234],
        [115.36262512207031, 36.342380523681754],
        [115.34253692626964, 36.38442230224621],
        [115.29388427734386, 36.41213226318354],
        [115.30603790283203, 36.43793106079113],
        [115.28143310546875, 36.47678756713873],
        [115.29291534423851, 36.520103454589844],
        [115.32230377197277, 36.54581069946295],
        [115.33660125732433, 36.61305999755865],
        [115.36998748779308, 36.63021469116222],
        [115.41259002685547, 36.683006286621094],
        [115.4307861328125, 36.68991088867193],
        [115.4688491821289, 36.74204254150402],
        [115.48047637939464, 36.76197052001953],
        [115.58241271972656, 36.779426574707145],
        [115.68394470214855, 36.81945800781256],
        [115.7004165649414, 36.87666702270502],
        [115.75374603271496, 36.915134429931754],
        [115.77561950683594, 36.909465789794865],
        [115.8946304321289, 36.905590057373104],
        [115.91487121582031, 36.89275741577154],
        [116.05883026123047, 36.88069534301758]
      ];
      const origindata = [
        {
          station_name: "阳谷侨润中学",
          time_point: 1568962800000,
          AQI: 100,
          station_code: "371521801",
          lon: 115.791,
          id: 39538,
          lat: 36.142
        },
        {
          station_name: "阳谷南湖公园",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371521802",
          lon: 115.793194,
          id: 39539,
          lat: 36.093001
        },
        {
          station_name: "阳谷县植物园",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371521803",
          lon: 115.781,
          id: 39540,
          lat: 36.129
        },
        {
          station_name: "莘县污水处理厂",
          time_point: 1568962800000,
          AQI: 89,
          station_code: "371522802",
          lon: 115.684895,
          id: 39541,
          lat: 36.258843
        },
        {
          station_name: "莘县杨庄南",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371522803",
          lon: 115.652378,
          id: 39542,
          lat: 36.223977
        },
        {
          station_name: "莘县顺河公园",
          time_point: 1568962800000,
          AQI: 97,
          station_code: "371522804",
          lon: 115.69332,
          id: 39543,
          lat: 36.240196
        },
        {
          station_name: "茌平文化馆",
          time_point: 1568962800000,
          AQI: 103,
          station_code: "371523801",
          lon: 116.246,
          id: 39544,
          lat: 36.556704
        },
        {
          station_name: "茌平县政府",
          time_point: 1568962800000,
          AQI: 95,
          station_code: "371523802",
          lon: 116.249,
          id: 39545,
          lat: 36.580664
        },
        {
          station_name: "茌平环保局",
          time_point: 1568962800000,
          AQI: 90,
          station_code: "371523803",
          lon: 116.239,
          id: 39546,
          lat: 36.586405
        },
        {
          station_name: "东阿酒厂",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371524801",
          lon: 116.260129,
          id: 39547,
          lat: 36.333342
        },
        {
          station_name: "东阿污水处理厂",
          time_point: 1568962800000,
          AQI: 98,
          station_code: "371524802",
          lon: 116.249122,
          id: 39548,
          lat: 36.35376
        },
        {
          station_name: "东阿曹植公园",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371524803",
          lon: 116.238752,
          id: 39549,
          lat: 36.347269
        },
        {
          station_name: "冠县清逸生态园",
          time_point: 1568962800000,
          AQI: 115,
          station_code: "371525801",
          lon: 115.466007,
          id: 39550,
          lat: 36.500459
        },
        {
          station_name: "冠县广泽小区北",
          time_point: 1568962800000,
          AQI: 114,
          station_code: "371525802",
          lon: 115.438,
          id: 39551,
          lat: 36.475
        },
        {
          station_name: "冠县污水处理厂",
          time_point: 1568962800000,
          AQI: 115,
          station_code: "371525803",
          lon: 115.474591,
          id: 39552,
          lat: 36.471805
        },
        {
          station_name: "高唐普利花园",
          time_point: 1568962800000,
          AQI: 104,
          station_code: "371526801",
          lon: 116.23712,
          id: 39553,
          lat: 36.841241
        },
        {
          station_name: "高唐人民医院东院",
          time_point: 1568962800000,
          AQI: 115,
          station_code: "371526802",
          lon: 116.261,
          id: 39554,
          lat: 36.870592
        },
        {
          station_name: "高唐泉林包装厂",
          time_point: 1568962800000,
          AQI: 114,
          station_code: "371526803",
          lon: 116.219738,
          id: 39555,
          lat: 36.883693
        },
        {
          station_name: "临清新华中学",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371581801",
          lon: 115.795357,
          id: 39556,
          lat: 36.823502
        },
        {
          station_name: "临清市自来水厂",
          time_point: 1568962800000,
          AQI: 91,
          station_code: "371581802",
          lon: 115.681,
          id: 39557,
          lat: 36.754
        },
        {
          station_name: "临清市气象局",
          time_point: 1568962800000,
          AQI: 86,
          station_code: "371581803",
          lon: 115.733,
          id: 39558,
          lat: 36.812
        },
        {
          station_name: "古楼街道",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371502KQZ001",
          lon: 115.956142,
          id: 39559,
          lat: 36.469224
        },
        {
          station_name: "柳园街道",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371502KQZ002",
          lon: 115.987321,
          id: 39560,
          lat: 36.436024
        },
        {
          station_name: "新区街道",
          time_point: 1568962800000,
          AQI: 113,
          station_code: "371502KQZ003",
          lon: 115.979706,
          id: 39561,
          lat: 36.4672
        },
        {
          station_name: "道口铺街道",
          time_point: 1568962800000,
          AQI: 76,
          station_code: "371502KQZ004",
          lon: 115.85561,
          id: 39562,
          lat: 36.442835
        },
        {
          station_name: "闫寺街道",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371502KQZ005",
          lon: 115.88018,
          id: 39563,
          lat: 36.514232
        },
        {
          station_name: "斗虎屯镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371502KQZ006",
          lon: 115.801206,
          id: 39564,
          lat: 36.685745
        },
        {
          station_name: "梁水镇",
          time_point: 1568962800000,
          AQI: 72,
          station_code: "371502KQZ007",
          lon: 115.896569,
          id: 39565,
          lat: 36.583242
        },
        {
          station_name: "沙镇",
          time_point: 1568962800000,
          AQI: 67,
          station_code: "371502KQZ008",
          lon: 115.838246,
          id: 39566,
          lat: 36.295069
        },
        {
          station_name: "堂邑镇",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371502KQZ009",
          lon: 115.793928,
          id: 39567,
          lat: 36.519029
        },
        {
          station_name: "张炉集镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371502KQZ010",
          lon: 115.761353,
          id: 39568,
          lat: 36.452633
        },
        {
          station_name: "郑家镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371502KQZ011",
          lon: 115.751346,
          id: 39569,
          lat: 36.45497
        },
        {
          station_name: "候营镇",
          time_point: 1568962800000,
          AQI: 75,
          station_code: "371502KQZ012",
          lon: 115.825516,
          id: 39570,
          lat: 36.369603
        },
        {
          station_name: "凤凰工业园",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371502KQZ013",
          lon: 116.013717,
          id: 39571,
          lat: 36.377074
        },
        {
          station_name: "嘉明经济开发区",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371502KQZ014",
          lon: 115.923233,
          id: 39572,
          lat: 36.49989
        },
        {
          station_name: "东城街道",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371502KQZ015",
          lon: 116.03462,
          id: 39573,
          lat: 36.455019
        },
        {
          station_name: "北城街道",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371502KQZ016",
          lon: 116.072045,
          id: 39574,
          lat: 36.517581
        },
        {
          station_name: "蒋官屯街道",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371502KQZ017",
          lon: 116.065723,
          id: 39575,
          lat: 36.466849
        },
        {
          station_name: "物流园区",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371502KQZ018",
          lon: 115.991594,
          id: 39576,
          lat: 36.501558
        },
        {
          station_name: "广平乡",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371502KQZ019",
          lon: 116.176314,
          id: 39577,
          lat: 36.476542
        },
        {
          station_name: "九州街道",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371502KQZ020",
          lon: 116.033696,
          id: 39578,
          lat: 36.442518
        },
        {
          station_name: "许营镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371502KQZ021",
          lon: 116.063261,
          id: 39579,
          lat: 36.388954
        },
        {
          station_name: "顾官屯镇",
          time_point: 1568962800000,
          AQI: 69,
          station_code: "371502KQZ022",
          lon: 116.146134,
          id: 39580,
          lat: 36.292049
        },
        {
          station_name: "韩集乡",
          time_point: 1568962800000,
          AQI: 118,
          station_code: "371502KQZ023",
          lon: 116.182075,
          id: 39581,
          lat: 36.408958
        },
        {
          station_name: "湖西街道",
          time_point: 1568962800000,
          AQI: 76,
          station_code: "371502KQZ024",
          lon: 115.966267,
          id: 39582,
          lat: 36.396028
        },
        {
          station_name: "李海务街道",
          time_point: 1568962800000,
          AQI: 117,
          station_code: "371502KQZ025",
          lon: 115.971687,
          id: 39583,
          lat: 36.317226
        },
        {
          station_name: "朱老庄镇",
          time_point: 1568962800000,
          AQI: 75,
          station_code: "371502KQZ026",
          lon: 115.897434,
          id: 39584,
          lat: 36.311905
        },
        {
          station_name: "于集镇",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371502KQZ027",
          lon: 116.050087,
          id: 39585,
          lat: 36.32983
        },
        {
          station_name: "振兴街道",
          time_point: 1568962800000,
          AQI: 76,
          station_code: "371523KQZ001",
          lon: 116.270881,
          id: 39586,
          lat: 36.53077
        },
        {
          station_name: "冯官屯镇",
          time_point: 1568962800000,
          AQI: 89,
          station_code: "371523KQZ005",
          lon: 116.284815,
          id: 39587,
          lat: 36.6607
        },
        {
          station_name: "博平镇",
          time_point: 1568962800000,
          AQI: 81,
          station_code: "371523KQZ006",
          lon: 116.07764,
          id: 39588,
          lat: 36.548743
        },
        {
          station_name: "菜屯镇",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371523KQZ007",
          lon: 116.029017,
          id: 39589,
          lat: 36.731119
        },
        {
          station_name: "清泉街道",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371525KQZ001",
          lon: 115.421944,
          id: 39590,
          lat: 36.483611
        },
        {
          station_name: "崇文街道",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371525KQZ002",
          lon: 115.409189,
          id: 39591,
          lat: 36.523374
        },
        {
          station_name: "烟庄街道",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371525KQZ003",
          lon: 115.536944,
          id: 39592,
          lat: 36.519444
        },
        {
          station_name: "东古城镇",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371525KQZ004",
          lon: 115.339379,
          id: 39593,
          lat: 36.54266
        },
        {
          station_name: "桑阿镇",
          time_point: 1568962800000,
          AQI: 87,
          station_code: "371525KQZ005",
          lon: 115.580833,
          id: 39594,
          lat: 36.415833
        },
        {
          station_name: "贾镇",
          time_point: 1568962800000,
          AQI: 94,
          station_code: "371525KQZ006",
          lon: 115.600833,
          id: 39595,
          lat: 36.515556
        },
        {
          station_name: "清水镇",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371525KQZ007",
          lon: 115.493889,
          id: 39596,
          lat: 36.615
        },
        {
          station_name: "北馆陶镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371525KQZ008",
          lon: 115.442778,
          id: 39597,
          lat: 36.621667
        },
        {
          station_name: "柳林镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371525KQZ009",
          lon: 115.7126,
          id: 39598,
          lat: 36.653505
        },
        {
          station_name: "店子镇",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371525KQZ010",
          lon: 115.510491,
          id: 39599,
          lat: 36.569911
        },
        {
          station_name: "定远寨镇",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371525KQZ011",
          lon: 115.736239,
          id: 39600,
          lat: 36.504437
        },
        {
          station_name: "辛集镇",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371525KQZ012",
          lon: 115.675545,
          id: 39601,
          lat: 36.569788
        },
        {
          station_name: "梁堂镇",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371525KQZ013",
          lon: 115.461944,
          id: 39602,
          lat: 36.4225
        },
        {
          station_name: "斜店乡",
          time_point: 1568962800000,
          AQI: 90,
          station_code: "371525KQZ014",
          lon: 115.350278,
          id: 39603,
          lat: 36.416667
        },
        {
          station_name: "兰沃乡",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371525KQZ015",
          lon: 115.672222,
          id: 39604,
          lat: 36.603333
        },
        {
          station_name: "范寨镇",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371525KQZ016",
          lon: 115.695259,
          id: 39605,
          lat: 36.608005
        },
        {
          station_name: "甘官屯乡",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371525KQZ017",
          lon: 115.584444,
          id: 39606,
          lat: 36.630278
        },
        {
          station_name: "万善乡",
          time_point: 1568962800000,
          AQI: 87,
          station_code: "371525KQZ018",
          lon: 115.43983,
          id: 39607,
          lat: 36.581243
        },
        {
          station_name: "冠县开发区",
          time_point: 1568962800000,
          AQI: 107,
          station_code: "371525KQZ019",
          lon: 115.458056,
          id: 39608,
          lat: 36.505833
        },
        {
          station_name: "莘州街道",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371522KQZ001",
          lon: 115.653056,
          id: 39609,
          lat: 36.202778
        },
        {
          station_name: "莘亭街道",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371522KQZ002",
          lon: 115.678333,
          id: 39610,
          lat: 36.275556
        },
        {
          station_name: "东鲁街道",
          time_point: 1568962800000,
          AQI: 73,
          station_code: "371522KQZ003",
          lon: 115.696944,
          id: 39611,
          lat: 36.240833
        },
        {
          station_name: "燕塔街道",
          time_point: 1568962800000,
          AQI: 87,
          station_code: "371522KQZ004",
          lon: 115.655,
          id: 39612,
          lat: 36.224167
        },
        {
          station_name: "张鲁回族镇",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371522KQZ005",
          lon: 115.531667,
          id: 39613,
          lat: 36.249444
        },
        {
          station_name: "朝城镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371522KQZ006",
          lon: 115.578102,
          id: 39614,
          lat: 36.065354
        },
        {
          station_name: "十八里铺镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371522KQZ007",
          lon: 115.644722,
          id: 39615,
          lat: 36.155556
        },
        {
          station_name: "大张家镇",
          time_point: 1568962800000,
          AQI: 99,
          station_code: "371522KQZ008",
          lon: 115.386111,
          id: 39616,
          lat: 35.8625
        },
        {
          station_name: "古云镇",
          time_point: 1568962800000,
          AQI: 70,
          station_code: "371522KQZ009",
          lon: 115.405278,
          id: 39617,
          lat: 35.843889
        },
        {
          station_name: "古城镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371522KQZ010",
          lon: 115.636667,
          id: 39618,
          lat: 35.926944
        },
        {
          station_name: "观城镇",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371522KQZ011",
          lon: 115.390833,
          id: 39619,
          lat: 35.931389
        },
        {
          station_name: "董杜庄镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371522KQZ012",
          lon: 115.510833,
          id: 39620,
          lat: 36.199444
        },
        {
          station_name: "燕店镇",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371522KQZ013",
          lon: 115.596667,
          id: 39621,
          lat: 36.312222
        },
        {
          station_name: "樱桃园镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371522KQZ014",
          lon: 115.489444,
          id: 39622,
          lat: 35.939722
        },
        {
          station_name: "河店镇",
          time_point: 1568962800000,
          AQI: 87,
          station_code: "371522KQZ015",
          lon: 115.684167,
          id: 39623,
          lat: 36.332222
        },
        {
          station_name: "妹冢镇",
          time_point: 1568962800000,
          AQI: 72,
          station_code: "371522KQZ016",
          lon: 115.555,
          id: 39624,
          lat: 36.115556
        },
        {
          station_name: "王奉镇",
          time_point: 1568962800000,
          AQI: 87,
          station_code: "371522KQZ017",
          lon: 115.441389,
          id: 39625,
          lat: 36.316944
        },
        {
          station_name: "魏庄镇",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371522KQZ018",
          lon: 115.558611,
          id: 39626,
          lat: 36.3525
        },
        {
          station_name: "张寨镇",
          time_point: 1568962800000,
          AQI: 73,
          station_code: "371522KQZ019",
          lon: 115.509722,
          id: 39627,
          lat: 36.059167
        },
        {
          station_name: "大王寨镇",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371522KQZ020",
          lon: 115.518611,
          id: 39628,
          lat: 36.300833
        },
        {
          station_name: "徐庄镇",
          time_point: 1568962800000,
          AQI: 75,
          station_code: "371522KQZ021",
          lon: 115.626389,
          id: 39629,
          lat: 36.079444
        },
        {
          station_name: "王庄集镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371522KQZ022",
          lon: 115.493071,
          id: 39630,
          lat: 35.979163
        },
        {
          station_name: "俎店镇",
          time_point: 1568962800000,
          AQI: 75,
          station_code: "371522KQZ023",
          lon: 115.524444,
          id: 39631,
          lat: 36.201111
        },
        {
          station_name: "柿子园镇",
          time_point: 1568962800000,
          AQI: 71,
          station_code: "371522KQZ024",
          lon: 115.552426,
          id: 39632,
          lat: 35.989494
        },
        {
          station_name: "阿城镇",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371521KQZ001",
          lon: 116.0463889,
          id: 39633,
          lat: 36.16861111
        },
        {
          station_name: "安乐镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371521KQZ002",
          lon: 115.925,
          id: 39634,
          lat: 36.21222222
        },
        {
          station_name: "博济桥街道",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371521KQZ003",
          lon: 115.7869444,
          id: 39635,
          lat: 36.10277778
        },
        {
          station_name: "大布乡",
          time_point: 1568962800000,
          AQI: 91,
          station_code: "371521KQZ004",
          lon: 115.7722222,
          id: 39636,
          lat: 36.16833333
        },
        {
          station_name: "定水镇",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371521KQZ005",
          lon: 115.8183333,
          id: 39637,
          lat: 36.2525
        },
        {
          station_name: "高庙王镇",
          time_point: 1568962800000,
          AQI: 70,
          station_code: "371521KQZ006",
          lon: 115.7286111,
          id: 39638,
          lat: 36.04083333
        },
        {
          station_name: "郭店屯镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371521KQZ007",
          lon: 115.9055556,
          id: 39639,
          lat: 36.28027778
        },
        {
          station_name: "金斗营镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371521KQZ008",
          lon: 115.6805556,
          id: 39640,
          lat: 35.96833333
        },
        {
          station_name: "李台镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371521KQZ009",
          lon: 115.7533333,
          id: 39641,
          lat: 35.99777778
        },
        {
          station_name: "七级镇",
          time_point: 1568962800000,
          AQI: 75,
          station_code: "371521KQZ010",
          lon: 116.0216667,
          id: 39642,
          lat: 36.24138889
        },
        {
          station_name: "侨润街道",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371521KQZ011",
          lon: 115.7880556,
          id: 39643,
          lat: 36.14083333
        },
        {
          station_name: "狮子楼街道",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371521KQZ012",
          lon: 115.7388889,
          id: 39644,
          lat: 36.08944444
        },
        {
          station_name: "十五里园镇",
          time_point: 1568962800000,
          AQI: 81,
          station_code: "371521KQZ013",
          lon: 115.9025,
          id: 39645,
          lat: 36.05194444
        },
        {
          station_name: "石佛镇",
          time_point: 1568962800000,
          AQI: 69,
          station_code: "371521KQZ014",
          lon: 115.8516667,
          id: 39646,
          lat: 36.2325
        },
        {
          station_name: "寿张镇",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371521KQZ015",
          lon: 115.925,
          id: 39647,
          lat: 36.21222222
        },
        {
          station_name: "西湖镇",
          time_point: 1568962800000,
          AQI: 88,
          station_code: "371521KQZ016",
          lon: 115.7016667,
          id: 39648,
          lat: 36.11611111
        },
        {
          station_name: "阎楼镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371521KQZ017",
          lon: 115.8813889,
          id: 39649,
          lat: 36.12527778
        },
        {
          station_name: "张秋镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371521KQZ018",
          lon: 116.0052778,
          id: 39650,
          lat: 36.07555556
        },
        {
          station_name: "祥光生态工业园区",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371521KQZ019",
          lon: 115.9055556,
          id: 39651,
          lat: 36.28027778
        },
        {
          station_name: "祥光经济开发区",
          time_point: 1568962800000,
          AQI: 76,
          station_code: "371521KQZ020",
          lon: 115.8366667,
          id: 39652,
          lat: 36.13722222
        },
        {
          station_name: "铜城街道",
          time_point: 1568962800000,
          AQI: 72,
          station_code: "371524KQZ001",
          lon: 116.2652778,
          id: 39653,
          lat: 36.33
        },
        {
          station_name: "新城街道",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371524KQZ002",
          lon: 116.2325,
          id: 39654,
          lat: 36.35527778
        },
        {
          station_name: "刘集镇",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371524KQZ003",
          lon: 116.1058333,
          id: 39655,
          lat: 36.2
        },
        {
          station_name: "东阿经济开发区",
          time_point: 1568962800000,
          AQI: 69,
          station_code: "371524KQZ004",
          lon: 116.2758333,
          id: 39656,
          lat: 36.34861111
        },
        {
          station_name: "牛角店",
          time_point: 1568962800000,
          AQI: 68,
          station_code: "371524KQZ005",
          lon: 116.4330556,
          id: 39657,
          lat: 36.40611111
        },
        {
          station_name: "姜楼镇",
          time_point: 1568962800000,
          AQI: 74,
          station_code: "371524KQZ006",
          lon: 116.1675,
          id: 39658,
          lat: 36.25861111
        },
        {
          station_name: "姚寨镇",
          time_point: 1568962800000,
          AQI: 71,
          station_code: "371524KQZ007",
          lon: 116.3608333,
          id: 39659,
          lat: 36.37138889
        },
        {
          station_name: "陈集镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371524KQZ008",
          lon: 116.2961111,
          id: 39660,
          lat: 36.35472222
        },
        {
          station_name: "大桥镇",
          time_point: 1568962800000,
          AQI: 57,
          station_code: "371524KQZ009",
          lon: 116.3572222,
          id: 39661,
          lat: 36.31277778
        },
        {
          station_name: "鱼山镇",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371524KQZ010",
          lon: 116.2005556,
          id: 39662,
          lat: 36.21833333
        },
        {
          station_name: "高集镇",
          time_point: 1568962800000,
          AQI: 65,
          station_code: "371524KQZ011",
          lon: 116.3769444,
          id: 39663,
          lat: 36.45861111
        },
        {
          station_name: "人和街道",
          time_point: 1568962800000,
          AQI: 109,
          station_code: "371526KQZ002",
          lon: 116.278451,
          id: 39664,
          lat: 36.876267
        },
        {
          station_name: "汇鑫街道",
          time_point: 1568962800000,
          AQI: 102,
          station_code: "371526KQZ003",
          lon: 116.176734,
          id: 39665,
          lat: 36.876975
        },
        {
          station_name: "梁村镇",
          time_point: 1568962800000,
          AQI: 113,
          station_code: "371526KQZ004",
          lon: 116.248754,
          id: 39666,
          lat: 36.976694
        },
        {
          station_name: "尹集镇",
          time_point: 1568962800000,
          AQI: 99,
          station_code: "371526KQZ005",
          lon: 116.331291,
          id: 39667,
          lat: 36.907578
        },
        {
          station_name: "固河镇",
          time_point: 1568962800000,
          AQI: 107,
          station_code: "371526KQZ008",
          lon: 116.421623,
          id: 39668,
          lat: 36.905514
        },
        {
          station_name: "赵寨子镇",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371526KQZ010",
          lon: 116.162646,
          id: 39669,
          lat: 36.808491
        },
        {
          station_name: "姜店镇",
          time_point: 1568962800000,
          AQI: 98,
          station_code: "371526KQZ011",
          lon: 116.227408,
          id: 39670,
          lat: 36.805592
        },
        {
          station_name: "杨屯镇",
          time_point: 1568962800000,
          AQI: 113,
          station_code: "371526KQZ012",
          lon: 116.300556,
          id: 39671,
          lat: 36.802022
        },
        {
          station_name: "高唐县经济开发区",
          time_point: 1568962800000,
          AQI: 119,
          station_code: "371526KQZ013",
          lon: 116.223484,
          id: 39672,
          lat: 36.863422
        },
        {
          station_name: "青年路街道",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371581KQZ001",
          lon: 115.693896,
          id: 39673,
          lat: 36.761237
        },
        {
          station_name: "新华路街道",
          time_point: 1568962800000,
          AQI: 72,
          station_code: "371581KQZ002",
          lon: 115.8075,
          id: 39674,
          lat: 36.811389
        },
        {
          station_name: "先锋路街道",
          time_point: 1568962800000,
          AQI: 71,
          station_code: "371581KQZ003",
          lon: 115.751389,
          id: 39675,
          lat: 36.895
        },
        {
          station_name: "大辛庄街道",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371581KQZ004",
          lon: 115.73103,
          id: 39676,
          lat: 36.828789
        },
        {
          station_name: "烟店镇",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371581KQZ005",
          lon: 115.439167,
          id: 39677,
          lat: 36.692222
        },
        {
          station_name: "刘垓子镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371581KQZ006",
          lon: 115.7875,
          id: 39678,
          lat: 36.7375
        },
        {
          station_name: "潘庄镇",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371581KQZ007",
          lon: 115.512222,
          id: 39679,
          lat: 36.731667
        },
        {
          station_name: "魏湾镇",
          time_point: 1568962800000,
          AQI: 72,
          station_code: "371581KQZ008",
          lon: 115.835556,
          id: 39680,
          lat: 36.6925
        },
        {
          station_name: "康庄镇",
          time_point: 1568962800000,
          AQI: 77,
          station_code: "371581KQZ009",
          lon: 115.916944,
          id: 39681,
          lat: 36.753056
        },
        {
          station_name: "松林镇",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371581KQZ010",
          lon: 115.925833,
          id: 39682,
          lat: 36.886944
        },
        {
          station_name: "老赵庄镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371581KQZ011",
          lon: 115.839722,
          id: 39683,
          lat: 36.840278
        },
        {
          station_name: "八岔路镇",
          time_point: 1568962800000,
          AQI: 80,
          station_code: "371581KQZ012",
          lon: 115.601944,
          id: 39684,
          lat: 36.693611
        },
        {
          station_name: "唐园镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371581KQZ013",
          lon: 115.585556,
          id: 39685,
          lat: 36.740556
        },
        {
          station_name: "尚店镇",
          time_point: 1568962800000,
          AQI: 78,
          station_code: "371581KQZ014",
          lon: 115.683889,
          id: 39686,
          lat: 36.720556
        },
        {
          station_name: "戴湾镇",
          time_point: 1568962800000,
          AQI: 118,
          station_code: "371581KQZ015",
          lon: 115.876944,
          id: 39687,
          lat: 36.758889
        },
        {
          station_name: "金郝庄镇",
          time_point: 1568962800000,
          AQI: 76,
          station_code: "371581KQZ016",
          lon: 115.973683,
          id: 39688,
          lat: 36.862202
        },
        {
          station_name: "信发街道",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371523KQZ002",
          lon: 116.245373,
          id: 39689,
          lat: 36.630144
        },
        {
          station_name: "温陈街道",
          time_point: 1568962800000,
          AQI: 83,
          station_code: "371523KQZ003",
          lon: 116.205699,
          id: 39690,
          lat: 36.555688
        },
        {
          station_name: "乐平铺镇",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371523KQZ004",
          lon: 116.263227,
          id: 39691,
          lat: 36.450607
        },
        {
          station_name: "杜郎口镇",
          time_point: 1568962800000,
          AQI: 67,
          station_code: "371523KQZ008",
          lon: 116.379336,
          id: 39692,
          lat: 36.5646
        },
        {
          station_name: "韩屯镇",
          time_point: 1568962800000,
          AQI: 91,
          station_code: "371523KQZ009",
          lon: 116.141781,
          id: 39693,
          lat: 36.673658
        },
        {
          station_name: "胡屯镇",
          time_point: 1568962800000,
          AQI: 122,
          station_code: "371523KQZ010",
          lon: 116.213322,
          id: 39694,
          lat: 36.664577
        },
        {
          station_name: "贾寨镇",
          time_point: 1568962800000,
          AQI: 79,
          station_code: "371523KQZ011",
          lon: 115.939178,
          id: 39695,
          lat: 36.643353
        },
        {
          station_name: "洪官屯镇",
          time_point: 1568962800000,
          AQI: 84,
          station_code: "371523KQZ012",
          lon: 115.978175,
          id: 39696,
          lat: 36.578229
        },
        {
          station_name: "肖家庄镇",
          time_point: 1568962800000,
          AQI: 82,
          station_code: "371523KQZ013",
          lon: 116.045455,
          id: 39697,
          lat: 36.6509
        },
        {
          station_name: "杨官屯乡",
          time_point: 1568962800000,
          AQI: 85,
          station_code: "371523KQZ014",
          lon: 116.007528,
          id: 39698,
          lat: 36.58438
        },
        {
          station_name: "清平镇",
          time_point: 1568962800000,
          AQI: 89,
          station_code: "371526KQZ006",
          lon: 116.093472,
          id: 39699,
          lat: 36.762507
        },
        {
          station_name: "琉璃寺镇",
          time_point: 1568962800000,
          AQI: 119,
          station_code: "371526KQZ007",
          lon: 116.3464,
          id: 39700,
          lat: 36.720159
        },
        {
          station_name: "鱼邱湖街道",
          time_point: 1568962800000,
          AQI: 114,
          station_code: "371526KQZ001",
          lon: 116.241838,
          id: 39701,
          lat: 36.833167
        },
        {
          station_name: "三十里铺镇",
          time_point: 1568962800000,
          AQI: 92,
          station_code: "371526KQZ009",
          lon: 116.095612,
          id: 39702,
          lat: 36.858835
        },
        {
          station_name: "聊城开发区",
          time_point: 1568962800000,
          AQI: 101,
          station_code: "371500901",
          lon: 116.043858,
          id: 39703,
          lat: 36.454715
        },
        {
          station_name: "龙大植物油厂",
          time_point: 1568962800000,
          AQI: 86,
          station_code: "371530801",
          lon: 116.049613,
          id: 39704,
          lat: 36.477645
        },
        {
          station_name: "东郊自来水厂",
          time_point: 1568962800000,
          AQI: 0,
          station_code: "371530802",
          lon: 116.039984,
          id: 39705,
          lat: 36.448543
        },
        {
          station_name: "凤凰苑",
          time_point: 1568962800000,
          AQI: 81,
          station_code: "371530803",
          lon: 115.981178,
          id: 39706,
          lat: 36.433652
        },
        {
          station_name: "海关",
          time_point: 1568962800000,
          AQI: 97,
          station_code: "371500902",
          lon: 115.958252,
          id: 39707,
          lat: 36.443753
        },
        {
          station_name: "区政府",
          time_point: 1568962800000,
          AQI: 94,
          station_code: "371500051",
          lon: 115.991536,
          id: 39708,
          lat: 36.443067
        },
        {
          station_name: "聊大东校",
          time_point: 1568962800000,
          AQI: 102,
          station_code: "371500061",
          lon: 116.007,
          id: 39709,
          lat: 36.435
        },
        {
          station_name: "监控中心",
          time_point: 1568962800000,
          AQI: 101,
          station_code: "371500062",
          lon: 115.98194444,
          id: 39710,
          lat: 36.4977778
        }
      ];
      const canvasLayer = new Image({
        source: new ImageCanvas({
          canvasFunction: (
            extent,
            resolution,
            pixelRatio,
            size,
            projection
          ) => {
            const [width, height] = size;
            const [left, bottom, right, top] = extent;
            const xscale = width / (right - left);
            const yscale = height / (top - bottom);

            var pdata = manageData(origindata, xscale, yscale, top, left);
            var cw = Math.ceil(pdata.xmax);
            var ch = Math.ceil(pdata.ymax);

            var idwdata = olIDW(pdata.data, cw, ch);
            let canvas = document.createElement("canvas");
            canvas.width = cw;
            canvas.height = ch;
            canvas.style.display = "block";
            //设置canvas透明度
            canvas.getContext("2d").globalAlpha = 0.1;
            let context = canvas.getContext("2d");
            let contours = DC.contours().size([cw, ch]); //等高线绘图实例
            let d3Path = d3.geoPath(null, context); //绘图笔
            context.clearRect(0, 0, cw, ch);
            // 绘制裁剪区
            context.beginPath();
            for (var i = 0; i < Regioncoord.length; i++) {
              var rp = coordToPoint(
                Regioncoord[i][0],
                Regioncoord[i][1],
                xscale,
                yscale,
                top,
                left
              );
              context.lineTo(rp[0], rp[1]);
            }
            context.closePath();
            context.stroke();
            context.clip();

            context.globalAlpha = 0.3; //设置透明度
            context.lineWidth = 2; //线条宽度

            var colors = [
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

            function manageData(data, xscale, yscale, top, left) {
              var _data = [];
              var xmax = 0;
              var ymax = 0;
              var xmin = 9999;
              var ymin = 9999;
              for (var i = 0; i < data.length; i++) {
                var p = coordToPoint(
                  data[i].lon,
                  data[i].lat,
                  xscale,
                  yscale,
                  top,
                  left
                );
                if (i === 0) {
                  xmax = p[0];
                  ymax = p[1];
                }
                xmax > p[0] ? null : (xmax = p[0]);
                ymax > p[1] ? null : (ymax = p[1]);
                xmin < p[0] ? null : (xmin = p[0]);
                ymin < p[1] ? null : (ymin = p[1]);
                _data.push({
                  x: p[0],
                  y: p[1],
                  value: data[i].AQI
                });
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
              var px = Math.abs(left - x) * xscale;
              var py = Math.abs(top - y) * yscale;
              return [px, py];
            }

            function olIDW(data, width, height) {
              var s = new Date().getTime();
              var d = data;

              //已有点初始二维数组
              var dlen = d.length;
              var matrixData = new Array(width * height);
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
                      var dis =
                        (i - dk.y) * (i - dk.y) + (j - dk.x) * (j - dk.x);
                      sum0 = sum0 + (dk.value * 1) / dis;
                      sum1 = sum1 + 1 / dis;
                      idwcount++;
                    }
                    if (sum1 != 0)
                      //matrixData[k1] = sum0 / sum1 - referenceValue;
                      matrixData[k1] = sum0 / sum1;
                    else matrixData[k1] = 1;
                  }
                }
              }
              console.log(idwcount);
              var e = new Date().getTime();
              console.log("插值：" + (e - s) / 1000 + "秒");
              return matrixData;
            }

            function getColor(colors, value) {
              var len = colors.length;
              for (var i = 0; i < len; i++) {
                if (value > colors[i].min && value <= colors[i].max)
                  return d3.rgb(
                    colors[i].color[0],
                    colors[i].color[1],
                    colors[i].color[2]
                  );
              }
            }
            return canvas;
          },
          projection: "EPSG:4326"
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
