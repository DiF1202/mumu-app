<template>
  <view class="login-container" :style="{paddingTop:`${safetyTop}px`,height: `${windowHeight}px` }">
    <view class="logo-content">
			<u--image src="/static/icon/logo.png" width="120rpx" height="120rpx"></u--image>
      <text class="title">牧目科技</text>
    </view>
    <view class="login-form-content">
      <view class="input-item">
				<u--input
					v-model="loginInfo.account"
					placeholder="请输入您的用户名"
					border="false"
					shape="circle"
					customStyle="paddingLeft:40rpx;background:rgba(234, 243, 255, 1);height:100rpx;"
				></u--input>
      </view>
      <view class="input-item">
				<u--input
					v-model="loginInfo.code"
					placeholder="请输入您的密码"
					border="false"
					shape="circle"
					customStyle="paddingLeft:40rpx;background:rgba(234, 243, 255, 1);height:100rpx;"
				></u--input>
      </view>
      <view class="action-btn">
        <u-button type="primary" text="登录" shape="circle"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        loginInfo: {
          account: '',
          code: ''
        }
      }
    },
    computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    onLoad() {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
		background-image: linear-gradient(180deg, rgba(234, 243, 255, 1) 0%, rgb(255, 255, 255) 100%);
    .logo-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-top: 240rpx;
      .title {
        color: #333333;
				font-size: 36rpx;
				font-weight: bold;
				margin-top: 40rpx;
      }
    }
    .login-form-content {
			padding: 60rpx;
			.input-item {
				margin-bottom: 50rpx;
			}
      .login-btn {
        height: 45px;
      }
    }
  }
</style>