<template>
  <view class="mine-container">
    <uni-navtopbar title="个人中心"></uni-navtopbar>
    <view class="content" :style="{ height: `${windowHeight - safetyTop - 40}px` }">
      <view class="mine-section">
        <u--image :showLoading="true" src="https://m.zzxmt.cn/cdn/icon/woman.png" width="67px" height="67px" shape="circle"></u--image>
        <view class="mine-info">
          <u--text :text="user_info.nickname" bold size="40rpx" color="#333333"></u--text>
          <u--text :text="user_info.identity_type == 1 ? '牧场管家' : '牧场卫士'" size="30rpx" color="#666666" lineHeight="60rpx"></u--text>
        </view>
      </view>
      <view class="menu-section">
        <u-cell icon="phone" :iconStyle="iconStyle" :title="user_info.mobile" :titleStyle="titleStyle" :border="true"></u-cell>
        <u-cell icon="map" :iconStyle="iconStyle" :title="user_info.area" :titleStyle="titleStyle" :border="true"></u-cell>
        <u-cell icon="list-dot" :iconStyle="iconStyle" :title="user_info.farm_house_list.join('/')" :titleStyle="titleStyle" :border="true"></u-cell>
      </view>
      <u-gap height="24rpx"></u-gap>
      <view class="menu-section">
        <u-cell icon="setting" :iconStyle="iconStyle" title="退出登录" :titleStyle="titleStyle" :border="true" isLink rightIconStyle="fontSize:40rpx;" @click="menuItemClick()">
        </u-cell>
      </view>
    </view>
    <uni-tabbar :tabCurrent="3"></uni-tabbar>
  </view>
</template>

<script>
import { userStore } from "@/store";
export default {
  data () {
    return {
      iconStyle: {
        color: "#10cc8f",
        fontSize: "48rpx",
        lineHeight: "48rpx"
      },
      titleStyle: {
        color: "#333333",
        fontSize: "34rpx",
        fontWeight: "bold"
      }
    };
  },
  computed: {
    windowHeight () {
      return uni.getSystemInfoSync().windowHeight;
    },
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
    user_info () {
      return userStore().user_info;
    }
  },
  methods: {
    menuItemClick () {
      userStore().clear_user_info();
      uni.reLaunch({ url: "/pages/login/index" });
    }
  }
};
</script>

<style lang="scss">
.mine-container {
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 100%);
    background: #f4f4f4;
    padding: 80rpx 24rpx 24rpx;
  }
  .mine-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 92rpx;
    .mine-info {
      padding: 0 28rpx;
    }
  }
  .menu-section {
    border-radius: 16rpx;
    transform: translateY(-20rpx);
    background: #fff;
    padding: 24rpx;
    .title-box {
      display: flex;
    }
  }
}
</style>
