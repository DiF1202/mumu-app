<template>
  <view class="charts-box">
    <qiun-data-charts
      type="tarea"
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
  props: {
    unit: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 30
    },
  },
  data () {
    return {
      chartData: {},
      opts: {
        background: 'none',
        enableScroll: true,
        padding: [0, 0, 0, 0],
        legend: {
          show: true,
          position: 'top',
          float: 'right',
          margin: 0,
          fontSize: 10
        },
        xAxis: {
          itemCount: 5,
          scrollShow: true,
          scrollAlign: 'right',
          scrollColor: 'rgba(0, 0, 0, 0.45)',
          boundaryGap: 'center',
          fontColor: 'rgba(0, 0, 0, 0.45)',
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 4,
          showTitle: true,
          data: [
            {
              max: this.max,
              type: 'value',
              fontColor: 'rgba(0, 0, 0, 0.45)',
              title: this.unit || '',
              titleFontSize: 12,
              titleFontColor: 'rgba(0, 0, 0, 0.45)',
            }
          ]
        },
        extra: {
          area: {
            type: "curve",
            opacity: 1,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      }
    }
  },
  methods: {
    initChart (xData, series, max, unit) {
      this.opts.yAxis.data[0].max = max || '30'
      this.opts.yAxis.data[0].title = unit || ''
      this.chartData = JSON.parse(JSON.stringify({
        categories: xData,
        series: series
      }))
    },
  }
}
</script>

<style lang="scss">
.charts-box {
  width: 100%;
  height: 100%;
}
</style>