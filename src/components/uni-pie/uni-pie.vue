<template>
	<view class="charts-box">
		<qiun-data-charts type="ring" :chartData="chartData" :opts="opts"/>
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
			}
	  },
	  methods: {
	    initChart() {
        let data = [
          {name: "苹果", value: 20},
          {name: '香蕉', value: 40},
          {name: '草莓', value: 30}
        ]
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