<template>
  <view class="content">
    <u-button type="primary" :plain="true" text="列表页" @click="listPage"></u-button>
		<u-button type="primary" :plain="true" :hairline="true" text="详情页"></u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    listPage() {
      uni.navigateTo({
         url: '/pages/view/components/list'
      })
    }
  }
};
</script>

<style>
</style>
