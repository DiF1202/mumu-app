<template>
	<view class="charts-box">
		<!-- :canvas2d="true" 开启后模拟器层级有问题 关闭真机层级有问题 -->
		<qiun-data-charts type="arcbar" :chartData="chartData" :opts="opts" :canvas2d="true"/>
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
					// 自定义图表样式在opts中配置相关属性
          title:{
            name:'360',
            color:'#7E45FF',
            fontSize: 18,
            fontWeight:600
          },
          subtitle:{
            name:'子标题',
            color:'#666666',
            fontSize: 12,
          },
          extra: {
            arcbar: {
              type: "default",
              width: 8,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              startAngle: 0.75,
              endAngle: 0.25,
              gap: 2
            }
          }
				}
	    }
	  },
		mounted() {
			// this.initChart()
		},
	  methods: {
	    initChart(data) {
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