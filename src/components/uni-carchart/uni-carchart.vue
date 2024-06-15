<template>
  <view class="charts-box">
    <qiun-data-charts
      type="column"
      :chartData="chartData"
      :opts="opts"
      :ontouch="true"
      inScrollView
      disableScroll
    />
  </view>
</template>
<script>
import qiunDataCharts from '@/components/uCharts/qiun-data-charts/qiun-data-charts.vue'
export default {
  components: { qiunDataCharts },
  data () {
    return {
      chartData: {},
      opts: {
        padding: [12, 0, 0, 0],
        enableScroll: true,
        dataLabel: false,
        legend: {
          show: false,
        },
        xAxis: {
          disableGrid: true,
          fontColor: 'rgba(0, 0, 0, 0.45)',
          boundaryGap: 'center',
          fontSize: 12,
          itemCount: 7,
          scrollShow: true,
          scrollAlign: 'right',
          scrollColor: 'rgba(0, 0, 0, 0.45)',
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 4,
          splitNumber: 24,
          showTitle: true,
          data: [
            {
              type: 'value',
              min: 0,
              max: 24,
              tofix: 1,
              fontColor: 'rgba(0, 0, 0, 0.45)',
              title: 'h',
              titleFontSize: 12,
              titleFontColor: 'rgba(0, 0, 0, 0.45)',
            }
          ]
        },
        extra: {
          column: {
            type: "stack",
            width: 12,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
          }
        }
      }
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart (xData, yData) {
      let res = {
        categories: xData,
        series: yData
      }
      this.chartData = JSON.parse(JSON.stringify(res))
    }
  }
}
</script>

<style lang="scss">
.charts-box {
  width: 100%;
  height: 100%;
}
</style>