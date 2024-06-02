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
      v-for="(tabItem, index) in tabList"
      :key="index"
      :text="tabItem.text"
      @click="tabHandler(tabItem, index)"
    >
      <template #active-icon>
        <u-icon
          :custom-prefix="`custom-icon custom-icon-${tabItem.iconSelect}`"
          size="42rpx"
          color="#10CC8F"
        ></u-icon>
      </template>
      <template #inactive-icon>
        <u-icon
          :custom-prefix="`custom-icon custom-icon-${tabItem.icon}`"
          size="42rpx"
          color="#333333"
        ></u-icon>
      </template>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
import { userStore } from "@/store";
import { butlerTabList, guardTabList } from "@/utils/tabBar.js";
export default {
  props: {
    tabCurrent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabList:
        userStore().user_info.identity_type === 1 ?  butlerTabList : guardTabList
    };
  },
  methods: {
    tabHandler(item, index) {
<<<<<<< HEAD
      if (index == 2) {
=======
      console.log(index);
      if (index === 2) {
>>>>>>> 0a1e95efea74785b1e03104363126cc91a8d5ccc
        uni.navigateTo({ url: item.pagePath });
      } else {
        uni.switchTab({ url: item.pagePath });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tabbar-container {
  width: 100%;
  height: 100%;
}
</style>
