<template>
	<view class="charts-box">
		<qiun-data-charts type="ring" :chartData="chartData" :opts="opts"/>
	</view>
</template>
<script>
import qiunDataCharts from '@/components/uCharts/qiun-data-charts/qiun-data-charts.vue'
	export default {
    components: { qiunDataCharts },
		props: {
			title: {
				type: String,
				default: ''
			},
			subtitle: {
				type: String,
				default: ''
			}
		},
	  data() {
	    return {
	      chartData: {},
				opts: {
					title: {
						name: this.title,
						color:'#7E45FF',
            fontSize: 14,
            fontWeight: 600
					},
					subtitle: {
						name: this.subtitle,
						color:'#666666',
            fontSize: 12,
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