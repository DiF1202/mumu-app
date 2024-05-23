<template>
  <view class="charts-box">
    <qiun-data-charts  type="mix" :opts="opts" :chartData="chartData" :ontouch="true"/>
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
        padding: [12,0,0,0],
        enableScroll: true,
        dataLabel: false,
        legend: {
          show: false
        },
        xAxis: {
          disableGrid: true,
          itemCount: 7,
          scrollShow: true,
          scrollColor: 'rgba(0, 0, 0, 0.45)',
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