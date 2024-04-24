<template>
	<view class="charts-box">
		<qiun-data-charts type="tarea" :chartData="chartData" :opts="opts" :ontouch="true"/>
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
			}
		},
	  data() {
	    return {
	      chartData: {},
				opts: {
					color: ["#19AECE"],
					enableScroll: true,
					padding: [12,0,0,0],
					legend: {
						show: false
					},
					xAxis: {
						itemCount: 6,
						scrollShow: true,
						scrollColor: '#19AECE',
						fontColor: 'rgba(0, 0, 0, 0.45)',
					},
					yAxis: {
						disableGrid: true,
						showTitle: true,
						splitNumber: 1,
						data:[
							{
								max: this.max,
								type: 'value',
								fontColor: 'rgba(0, 0, 0, 0.45)',
								title: this.unit ? `${this.unit}` : '',
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
		mounted() {
			// this.initChart()
		},
	  methods: {
	    initChart(xData, series) {
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
		height: 100%
	}
</style>