<template>
  <u-tabbar
    :value="tabCurrent"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    activeColor="#10CC8F"
    inactiveColor="#333333"
  >
    <u-tabbar-item
      v-for="(tabItem,index) in tabList"
      :key="index"
      :text="tabItem.text"
      @click="tabHandler(tabItem,index)"
    >
      <template slot="active-icon">
        <u-icon :custom-prefix="`custom-icon custom-icon-${tabItem.iconSelect}`" size="38rpx" color="#10CC8F"></u-icon>
      </template>
      <template slot="inactive-icon">
        <u-icon :custom-prefix="`custom-icon custom-icon-${tabItem.icon}`" size="38rpx"  color="#333333"></u-icon>
      </template>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
import { userStore } from '@/store'
export default {
  props: {
    tabCurrent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabList: userStore().tabList
    }
  },
  methods: {
    tabHandler(item, index) {
      if (index < 3) {
        uni.switchTab({ url: item.pagePath })
      } else {
        uni.navigateTo({ url: item.pagePath })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabbar-container {
    width: 100%;
    height: 100%;
  }
</style>