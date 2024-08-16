<template>
	<view class="charts-box">
		<qiun-data-charts type="column" :chartData="chartData" :opts="opts" :ontouch="true"/>
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
					padding: [0,0,0,0],
					enableScroll: true,
					dataLabel: false,
					legend: {
						position: 'top',
						float: 'right',
						fontSize: 10
					},
					xAxis: {
						disableGrid: true,
						fontColor: 'rgba(0, 0, 0, 0.45)',
					  boundaryGap: 'center',
						fontSize: 12,
						itemCount: 5,
						scrollShow: true,
						scrollAlign: 'right',
						scrollColor: 'rgba(0, 0, 0, 0.45)',
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
						column: {
							type: "stack",
							width: 20,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							// labelPosition: "center"
						}
					}
				}
	    }
	  },
	  methods: {
	    initChart(xData, yData, unit) {
				this.opts.yAxis.data[0].title = unit || ''
				let res = {
					categories: xData,
					series: yData
				}
				this.chartData = JSON.parse(JSON.stringify(res))
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