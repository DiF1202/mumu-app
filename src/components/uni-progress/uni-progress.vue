<template>
	<view class="charts-box">
		<!-- :canvas2d="true" 开启后模拟器层级有问题 关闭真机层级有问题 -->
		<qiun-data-charts type="arcbar" :chartData="chartData" :opts="opts"/>
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
		mounted() {
			// this.initChart()
		},
	  methods: {
	    initChart(data, title, subTitle) {
				this.opts = {
					// 自定义图表样式在opts中配置相关属性
          title:{
            name: title,
            color:'#333333',
            fontSize: 22,
            fontWeight:600
          },
          subtitle:{
            name: subTitle || '',
            color:'#666666',
            fontSize: 12,
          },
          extra: {
            arcbar: {
              type: "circle",
              width: 8,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              gap: 2
            }
          }
				}
				this.chartData = JSON.parse(JSON.stringify({series: data}))
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