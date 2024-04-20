<template>
  <view class="mine-container">
    <uni-navtopbbar title="个人中心"></uni-navtopbbar>
    <view class="content" :style="{height: `${windowHeight}px`}">
      <u-gap :height="`${safetyTop + 80}px`"></u-gap>
      <view class="mine-section">
        <u--image :showLoading="true" src="/static/icon/woman.png" width="67px" height="67px" shape="circle"></u--image>
        <view class="mine-info">
          <u--text :text="user_name" bold size="40rpx" color="#333333"></u--text>
          <u--text text="职位：法师" size="30rpx" color="#666666" lineHeight="60rpx"></u--text>
        </view>
      </view>
      <view class="menu-section">
        <u-cell icon="phone" :iconStyle="iconStyle" title="13888888888" :titleStyle="titleStyle" :border="true" ></u-cell>
        <u-cell icon="map" :iconStyle="iconStyle" title="中国/内蒙古/大草原" :titleStyle="titleStyle" :border="true" ></u-cell>
        <u-cell icon="list-dot" :iconStyle="iconStyle" title="负责栏位" :titleStyle="titleStyle" :border="true"></u-cell>
      </view>
      <u-gap height="24rpx"></u-gap>
      <view class="menu-section">
        <u-cell 
          icon="setting"
          :iconStyle="iconStyle"
          title="退出登录"
          :titleStyle="titleStyle"
          :border="false"
          isLink
          rightIconStyle="fontSize:40rpx;"
          @click="menuItemClick()"
        >
        </u-cell>
      </view>
    </view>
  </view>
</template>

<script>
  import { userStore } from '@/store'
  export default {
    data() {
      return {
        iconStyle: {
          color: "#2979ff",
          fontSize: '48rpx',
          lineHeight: '48rpx'
        },
        titleStyle: {
          color: "#333333",
          fontSize: '34rpx',
          fontWeight: 'bold'
        }
      }
    },
    computed: {
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight
      },
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      },
      user_name() {
        return userStore().userInfo.user_name;
      },
    },
    methods: {
      menuItemClick() {
        uni.reLaunch({ url: '/pages/login/index' })
      }
    }
  }
</script>

<style lang="scss">
  .mine-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 100%);
      padding: 0 24rpx 24rpx;
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
      padding: 0 24rpx;
			.title-box {
				display: flex;
			}
		}
  }
</style>
