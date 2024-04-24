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
								data: [[10,8.04],[8.07,6.95],[13,7.58],[9.05,8.81],[11,8.33],[14,7.66],[13.4,6.81],[10,6.33],[14,8.96],[12.5,6.82]]
							}
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