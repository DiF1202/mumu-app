<template>
  <view class="home-container">
    <uni-ring ref="ringChart"></uni-ring>
    <uni-tarea ref="tareaChart"></uni-tarea>
    <uni-line ref="lineChart"></uni-line>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        // 自定义图表样式在opts中配置相关属性
      }
    }
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.ringChart.initChart()
      this.$refs.tareaChart.initChart()
      this.$refs.lineChart.initChart()
    })
  },
  methods: {
  }
}
</script>

<style>
.home-container {
  width: 100%;
  height: 500rpx;
}
</style>
