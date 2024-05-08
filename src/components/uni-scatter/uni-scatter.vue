<template>
	<view class="charts-box">
		<qiun-data-charts  type="scatter" :chartData="chartData" :opts="opts"/>
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
					padding: [0, 12, 0, 12],
					legend: {
						position: 'top',
						float: 'right',
						margin: 12,
					},
					xAxis: {
						disableGrid: false,
						splitNumber: 5,
						boundaryGap: "justify",
						min: 0,
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
		onReady() {
			// this.initChart()
		},
	  methods: {
	    initChart() {
				this.$nextTick(() => {
					let res = {
						series: [
							{
								name: "散点一",
								data: [[0,8.04],[1.07,6.95],[2,7.58],[3.05,8.81],[4,8.33],[5,7.66],[6.4,6.81],[7,6.33],[8,8.96],[9.5,6.82]]
							},
						]
					}
          this.chartData = JSON.parse(JSON.stringify(res))
				})
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