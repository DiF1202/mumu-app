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
					padding: [12,0,0,0],
					enableScroll: true,
					dataLabel: false,
					legend: {
						show: false,
					},
					xAxis: {
						disableGrid: true,
						fontColor: 'rgba(0, 0, 0, 0.45)',
					  boundaryGap: 'center',
						fontSize: 12,
						itemCount: 7,
						scrollShow: true,
						scrollColor: 'rgba(0, 0, 0, 0.45)',
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 24,
						showTitle: true,
						data: [
							{
								type: 'value',
								min: 0,
								max: 24,
								tofix: 1,
								fontColor: 'rgba(0, 0, 0, 0.45)',
								title: 'h',
								titleFontSize: 12,
								titleFontColor: 'rgba(0, 0, 0, 0.45)',
							}
						]
					},
					extra: {
						column: {
							type: "stack",
							width: 12,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
						}
					}
				}
	    }
	  },
		mounted() {
			this.initChart()
		},
	  methods: {
	    initChart() {
				let xData = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
        let yData = [
          {
            data: [8, 9, 8, 7, 8, 8, 7, 9, 8, 7, 9],
            color: 'transparent'
          },
          {
            data: [1, 2, 3, 2, 1, 2, 2, 1, 2, 1, 1],
            color: 'orange'
          },
					{
            data: [4, 5, 0, 4, 5, 3, 4, 5, 5, 4, 3],
            color: 'transparent'
          },
					{
            data: [2, 1, 0, 2, 1, 3, 1, 1, 2, 1, 2],
            color: 'orange'
          },
					{
            data: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            color: 'transparent'
          },
					{
            data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            color: 'orange'
          },
        ]
				let res = {
					categories: xData,
					series: yData
				}
				this.chartData = JSON.parse(JSON.stringify(res))
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