<template>
  <view class="charts-box">
    <qiun-data-charts  type="mix" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script>
import qiunDataCharts from '@/components/uCharts/qiun-data-charts/qiun-data-charts.vue'
export default {
	components: { qiunDataCharts },
  data() {
    return {
      chartData: {},
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [12,0,0,0],
        dataLabel: false,
        legend: {
          show: false
        },
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          gridType: "dash",
          dashLength: 4,
          showTitle: false,
          data: [
            {
              position: "left",
            }
          ]
        }
      }
    }
  },
  methods: {
    initChart(xData, yData) {
      let res = {
        categories: xData,
        series: yData
      }
      this.chartData = JSON.parse(JSON.stringify(res))
    }
  }
}
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 100%;
  }
</style>