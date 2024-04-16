<template>
  <view class="login-container">
    <up-button type="primary" text="确定"></up-button>
    <view class="text">scss</view>
    <up-cell icon="share" title="停车坐爱枫林晚" :isLink="true" arrow-direction="down"></up-cell>
    <up-tabs :list="list"></up-tabs>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          { name: '关注' },  
          { name: '推荐' },  
          { name: '电影' },  
          { name: '科技' },  
          { name: '音乐' },  
          { name: '美食' },  
          { name: '文化' },  
          { name: '财经' },  
          { name: '手工' } 
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    .text {
      color: blue;
    }
  }
</style>