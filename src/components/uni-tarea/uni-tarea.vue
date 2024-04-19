<template>
	<view class="charts-box">
		<qiun-data-charts type="tarea" :chartData="chartData" :opts="opts" :ontouch="true"/>
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
					// 自定义图表样式在opts中配置相关属性
				}
	    }
	  },
		mounted() {
			this.initChart()
		},
	  methods: {
	    initChart() {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData = ['10', '20', '30', '40', '28', '19']
				this.chartData = JSON.parse(JSON.stringify({
					categories: xData,
					series: [{
						name: "目标值",
						data: yData
					}]
				}))
	    },
	  }
	}
</script>

<style lang="scss">
	.charts-box {
		width: 100%;
		height: 100%
	}
</style>