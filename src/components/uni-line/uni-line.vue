<template>
	<view class="charts-box">
		<qiun-data-charts type="line" :chartData="chartData" :opts="opts" :ontouch="true"/>
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
					padding: [0, 12, 0, 12],
					legend: {
						position: 'top',
						float: 'right',
						margin: 12,
					},
					xAxis: {
						disableGrid: true,
						fontColor: 'rgba(0, 0, 0, 0.45)',
					  boundaryGap: 'center',
						fontSize:12,
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 8,
						data:[
							{
								type: 'value',
								tofix: 1,
								fontColor: 'rgba(0, 0, 0, 0.45)'
							}
						]
					},
				}
	    }
	  },
		mounted() {
			// this.initChart()
		},
	  methods: {
	    initChart(xData, yData) {
				this.chartData = JSON.parse(JSON.stringify({
					categories: xData,
					series: yData
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