<template>
  <view
    class="login-container"
    :style="{ paddingTop: `${safetyTop}px`, height: `${windowHeight + 50}px` }"
  >
    <view class="logo-content">
      <u--image
        src="https://m.zzxmt.cn/cdn/icon/logo.png"
        width="120rpx"
        height="120rpx"
      ></u--image>
      <text class="title">牛羊规模化养殖智能系统（中试）</text>
      <!-- <u-loading-icon color="#00443A" :show="loadingShow"></u-loading-icon> -->
    </view>
    <view class="weixin-btn">
      <button
        type="default"
        open-type="getPhoneNumber"
        @getphonenumber="wxLogin"
        class="button"
      >
        <u-icon
          name="phone-fill"
          color="#10cc8F"
          size="28"
          label="手机号快捷登录"
          labelPos="right"
          labelSize="24rpx"
        ></u-icon>
      </button>
    </view>
    <view class="instructions-text">本系统由牧目智能科技（杭州）有限公司维护</view>
  </view>
</template>

<script>
import { loginApi } from "@/api/login";
import { userStore } from "@/store";
export default {
  data () {
    return {
      inputStyle: {
        paddingLeft: "40rpx",
        background: "rgba(234, 243, 255, 1)",
        height: "100rpx"
      },
      loadingShow: false
    };
  },
  computed: {
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
    windowHeight () {
      return uni.getSystemInfoSync().windowHeight - 50;
    }
  },
  onLoad () {
    const token = userStore().user_info.token;
    if (token) {
      this.pageTo();
    }
  },
  methods: {
    wxLogin (e) {
      this.loadingShow = true;
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        uni.login({
          provider: "weixin",
          success: res => {
            if (res.errMsg == "login:ok") {
              console.log(res.code, "login:ok");
              loginApi({
                wx_login_code: res.code,
                get_phone_code: e.detail.code
              })
                .then(loginRes => {
                  console.log(loginRes, "loginRes");
                  if (loginRes.code == 200) {
                    userStore().set_user_info(loginRes.data);
                    this.loadingShow = false;
                    uni.showToast({
                      icon: null,
                      title: "登录成功"
                    });
                    this.pageTo();
                  }
                })
                .catch(() => {
                  this.loadingShow = false;
                  uni.showToast({
                    icon: "fail",
                    title: "登录失败"
                  });
                });
            }
          }
        });
      } else {
        this.loadingShow = false;
        uni.showToast({
          icon: null,
          title: "无权限"
        });
      }
    },
    pageTo () {
      if (userStore().user_info.identity_type === 1) {
        uni.reLaunch({ url: "/pages/home/butler/index" })
      } else {
        uni.reLaunch({ url: "/pages/home/guard/index" })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  background: #f4f4f4;
  // background-image: linear-gradient(
  //   180deg,
  //   #00443a 0%,
  //   rgb(255, 255, 255) 100%
  // );
  .logo-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 240rpx;
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-top: 40rpx;
      margin-bottom: 200rpx;
    }
  }
  .weixin-btn {
    padding: 200rpx 0;
    .button {
      width: 300rpx;
      background: transparent;
    }
    button::after {
      border: none;
    }
  }
  .instructions-text{
    font-size: 12px;
    color: #605e5e;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
