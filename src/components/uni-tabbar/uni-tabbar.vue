<template>
  <u-tabbar
    :value="tabCurrent"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    activeColor="#10cc8F"
    inactiveColor="#333333"
  >
    <u-tabbar-item
      v-for="(tabItem, index) in tabList"
      :key="index"
      :text="tabItem.text"
      :badge="index == 1 ? alarm_num : ''"
      @click="tabHandler(tabItem, index)"
    >
      <template #active-icon>
        <u-icon
          :custom-prefix="`custom-icon custom-icon-${tabItem.iconSelect}`"
          size="42rpx"
          color="#10cc8F"
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
import { alarmUnhandlerNumApi } from "@/api/utils.js"
export default {
  props: {
    tabCurrent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabList:
        userStore().user_info.identity_type === 1 ? butlerTabList : guardTabList
    };
  },
  computed: {
    alarm_num () {
      return userStore().alarm_num;
    }
  },
  mounted () {
    alarmUnhandlerNumApi().then(res => {
      let total = res.data.un_handle_total || 0
      userStore().set_alarm_num(total)
    })
  },
  methods: {
    tabHandler (item, index) {
      if (index == 2) {
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
