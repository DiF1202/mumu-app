<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="mix"
      :opts="opts"
      :chartData="chartData"
    />
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
        legend: {
					show: false
				},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          splitNumber: 5,
          gridType: "dash",
          dashLength: 4,
					showTitle: false,
          data: [
            {
              position: "left",
              title: "折线"
            }
          ]
        }
      }
    };
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let res = {
            categories: ["2018","2019","2020","2021","2022","2023"],
            series: [
              {
                name: "曲面",
                type: "area",
                style: "curve",
                data: [70,50,85,130,64,88]
              },
              {
                name: "折线",
                type: "line",
                color: "#2fc25b",
                data: [120,140,105,170,95,160]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
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