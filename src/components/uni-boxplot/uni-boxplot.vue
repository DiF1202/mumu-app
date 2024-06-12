<template>
  <LEchart class="echart" ref="chartRef"></LEchart>
</template>
<script setup>
import LEchart from '@/components/l-echart/l-echart.vue'
import { ref } from "vue"
// #ifdef VUE3
// #ifdef MP
const echarts = require('../../static/echarts.min.js') // 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用
// #endif
// #ifndef MP
import * as echarts from 'echarts' // 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
// #endif
// #endif
let chartRef = ref() // 获取dom
let startNum = 0
const initChart = (xData, yData, lineData, unit, lineColor, legendName) => {
  if (yData.length > 7) {
    startNum = parseInt(100 - ((7 / yData.length) * 100))
  } else {
    startNum = 0
  }
  let option = {
    grid: {
      top: '25',
      bottom: '0',
      left: 0,
      right: '0',
      containLabel: true,
    },
    legend: {
      top: 0,
      right: 0,
    },
    dataZoom: [
      {
        "type": "inside",
        "start": startNum,
        "end": 100,
        "show": false,
        "xAxisIndex": [0],
        "zoomOnMouseWheel": false,
        "moveOnMouseWheel": true,
        "moveOnMouseMove": true,
        "z": 4,
        "filterMode": "filter",
        "startValue": 0,
        "endValue": 4,
        "disabled": false,
        "zoomLock": true,
        "preventDefaultMouseMove": true,
        "throttle": 100
      },
      {
        "type": "slider",
        "realtime": true,
        "show": false,
        "height": 6,
        "width": 56,
        "xAxisIndex": [
          0
        ],
        "fillerColor": "rgba(96, 172, 252,0.8)",
        "borderColor": "rgba(96, 172, 252,0.6)",
        "backgroundColor": "rgba(96, 172, 252,0.3)",
        "showDataShadow": false,
        "showDetail": false,
        "left": 0,
        "bottom": 6,
        "moveHandleSize": 0,
        "z": 4,
        "filterMode": "filter",
        "startValue": 0,
        "endValue": 4,
        "borderRadius": 3,
        "handleSize": "0",
        "zoomLock": true,
        "brushSelect": false,
        "throttle": 100
      }
    ],
    xAxis: {
      type: 'category',
      scale: true,
      splitNumber: 7,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.45)',
      },
      axisLine: {
        lineStyle: {
          width: 1.5,
          color: '#cccccc',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      data: xData,
    },
    yAxis: {
      name: unit || '',
      nameTextStyle: {
        color: "rgba(0, 0, 0, 0.45)",
        fontSize: '10',
        nameLocation: "end",
        lineHeight: '10',
        padding: [0, 0, -8, 0],
        verticalAlign: "bottom"
      },
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.45)',
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1.5,
          color: '#cccccc'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          width: 1.5,
          color: 'rgba(0, 0, 0, 0.1)',
          type: 'dashed'
        }
      },
    },
    series: [
      {
        type: 'boxplot',
        data: yData,
        boxWidth: 12,
        itemStyle: {
          borderColor: '#333333',
          borderWidth: 1,
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#F9DADA' },
              { offset: 1, color: '#F3A4A3' }
            ],
            globalCoord: false
          }
        }
      },
      {
        name: legendName || '',
        type: 'line',
        symbol: 'circle',
        color: lineColor || '',
        symbolSize: 5,
        label: {
          show: true,
          position: 'top',
          distance: 1,
        },
        emphasis: {
          focus: 'series'
        },
        data: lineData,
      }
    ]
  }
  chartRef.value.init(echarts, chart => {
    chart.setOption(option)
  })
}
// onMounted(() => {
//   initChart()
// })
defineExpose({ initChart })
</script>
 
<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
