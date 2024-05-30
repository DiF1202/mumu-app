<template>
  <LEchart class="echart" ref="chartRef"></LEchart>
</template>
<script setup>
import LEchart from '@/components/l-echart/l-echart.vue'
import { onMounted, reactive, ref } from "vue"
// #ifdef VUE3
// #ifdef MP
const echarts = require('../../static/echarts.min.js') // 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用
// #endif
// #ifndef MP
import * as echarts from 'echarts' // 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
// #endif
// #endif
let chartRef = ref() // 获取dom
const initChart = (xData, yData, lineData, unit, lineColor,) => {
  let option = {
    grid: {
      top: '20',
      bottom: '0',
      left: '0',
      right: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
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
