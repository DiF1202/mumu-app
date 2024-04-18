<template>
	<view class="charts-box">
		<qiun-data-charts type="bar" :chartData="chartData" :opts="opts"/>
	</view>
</template>
<script>
  import qiunDataCharts from '@/components/uCharts/qiun-data-charts/qiun-data-charts.vue'
	export default {
    components: { qiunDataCharts },
	  data() {
	    return {
	      chartData: {},
				opts: {}
	    };
	  },
	  methods: {
	    initChart() {
				let opts = {
					"type": "bar",
					'color': ['#E5E5E5', '#2681FF'],
					"padding": [0, 20, 20, 0],
					"xAxis": {
						"boundaryGap":"justify",
						"disableGrid":false,
						"min":0,
						"axisLine": false,
						'gridType': 'dash',
					},
					"yAxis": {
						'titleOffsetY': '-10',
					},
					"legend": {
						'position': 'top',
						'float': 'right',
					},
					"extra": {
						"bar": {
							"type": "group",
							"width": 8,
							'seriesGap': '-8',
							"meterBorde": 1,
							"meterFillColor": "#FFFFFF",
							"activeBgColor": "#000000",
							"activeBgOpacity": 0.08,
							'customColor': ['#E5E5E5', '#4EB7FF'],
							'linearType': "custom"
						},
					}
				}
				this.opts = opts
				let res = {
					categories: ["1月","2月","3月","4月","5月","6月", "7月","8月","9月","10月","11月", '12月'],
					series: [
						{
							name: "总数量",
							data: [23, 32, 51, 20, 41, 26, 16, 18, 22, 21, 10, 50]
						},
						{
							name: "已处理",
							data: [20, 23, 15, 16, 31, 21, 12, 11, 20, 11, 5, 30]
						}
					]
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