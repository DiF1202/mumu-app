<template>
  <view class="login-container" :style="{paddingTop:`${safetyTop}px`,height: `${windowHeight}px` }">
    <view class="logo-content">
			<u--image src="/static/icon/logo.png" width="120rpx" height="120rpx"></u--image>
      <text class="title">牧目科技</text>
    </view>
    <view class="login-form-content">
      <view class="input-phone">
				<u--input
					v-model="loginInfo.account"
					placeholder="请输入您的用户名"
					border="false"
					shape="circle"
					:customStyle="customStyle"
				></u--input>
      </view>
      <view class="input-code">
				<u--input
					v-model="loginInfo.code"
					placeholder="请输入验证码"
					border="false"
					shape="circle"
					:customStyle="customStyle"
				></u--input>
        <view class="code">
          <u-button type="primary" plain @click="getCode" shape="circle">{{tips}}</u-button>
          <u-code seconds="60" ref="uCode" @change="codeChange"></u-code>
        </view>
      </view>
      <view class="action-btn">
        <u-button type="primary" text="登录" shape="circle" @click="login"></u-button>
      </view>
      <view class="weixin-btn">
        <u-icon name="weixin-circle-fill" color="#10cc8f" size="28" label="微信登录" labelPos="top" labelSize="24rpx" labelColor=""></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
  import{ loginApi } from '@/api/login.js'
  export default {
    data() {
      return {
        customStyle: {
          paddingLeft: '40rpx',
          background: 'rgba(234, 243, 255, 1)',
          height: '100rpx',
        },
        loginInfo: {
          account: '',
          code: ''
        },
        tips: '获取验证码'
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
      login() {
        uni.reLaunch({ url: '/pages/home/index' })
      },
      codeChange(text) {
        this.tips = text
      },
      getCode() {
				if(this.$refs.uCode.canGetCode) {
					setTimeout(() => {
						this.$refs.uCode.start()
					}, 2000)
				}
			},
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
			.input-phone {
				margin-bottom: 50rpx;
			}
      .input-code {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50rpx;
        .code {
          width: 200rpx;
          margin-left: 20rpx;
        }
      }
      .login-btn {
        height: 45px;
      }
      .weixin-btn {
        margin-top: 100rpx;
      }
    }
  }
</style>