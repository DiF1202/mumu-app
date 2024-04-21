<template>
	<view class="charts-box">
		<qiun-data-charts type="pie" :chartData="chartData" :opts="opts"/>
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
					legend: {
						position: 'right',
						lineHeight: '25'
					},
				}
			}
	  },
	  methods: {
	    initChart(data) {
				this.chartData = {series: [{data: data}]}
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