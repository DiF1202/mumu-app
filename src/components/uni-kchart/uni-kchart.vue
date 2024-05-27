<template>
  <view class="charts-box">
    <qiun-data-charts type="candle" :opts="opts" :chartData="chartData" :disableScroll="true" :ontouch="true" />
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
        enableMarkLine: false,
        legend: {
          show: false
        },
        xAxis: {
          itemCount: 7,
          scrollShow: true,
          scrollColor: 'rgba(0, 0, 0, 0.45)',
          fontColor: 'rgba(0, 0, 0, 0.45)',
          fontSize: 12,
          boundaryGap: 'center',
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 4,
          showTitle: true,
          data: [
            {
              type: 'value',
              tofix: 1,
              fontColor: 'rgba(0, 0, 0, 0.45)',
              title: '',
              titleFontSize: 12,
              titleFontColor: 'rgba(0, 0, 0, 0.45)',
            }
          ]
        },
        extra: {
          candle: {
            color: {
              upLine: "#333333",
              upFill: "#F9DADA",
              downLine: "#333333",
              downFill: "#F3A4A3"
            },
            average: {
              show: true,
              name: ["MA1"],
              day: [1],
              color: ["#1890ff"]
            }
          }
        }
      }
    };
  },
  methods: {
    initChart (xData, yData, unit, color) {
      this.opts.extra.candle.average.color[0] = color || "#1890ff"
      this.opts.yAxis.data[0].title = unit || ''
      let res = {
        categories: xData,
        series: [
          {
            name: "消警比例",
            data: yData
          }
        ]
      }
      this.chartData = JSON.parse(JSON.stringify(res))
    },
  }
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 100%;
}
</style>