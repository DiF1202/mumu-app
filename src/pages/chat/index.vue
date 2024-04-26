<template>
  <view class="bg">
    <view v-if="ptzt == 0"> </view>
    <view v-if="ptzt == 1">
      <scroll-view scroll-with-animation scroll-y="true" style="width: 100%">
        <!-- 用来获取消息体高度 -->
        <view id="okk" scroll-with-animation>
          <!-- 消息 -->
          <view class="message-container" v-for="(x, i) in msgList" :key="i">
            <!-- 用户消息 头像可选加入-->
            <view v-if="x.my" class="user-message">
              <view class="message-content" @click="copyFn(x.msg)">
                <view class="message-text bg-cyan">
                  <text>{{ x.msg }}</text>
                </view>
              </view>
              <view class="chat-user-img margin-left">
                <image
                  src="../../static/robt.png"
                  mode="aspectFill"
                  style="height: 75rpx; width: 75rpx"
                ></image>
              </view>
            </view>
            <!-- 机器人消息 -->
            <view v-if="!x.my" class="robot-message">
              <view class="chat-robot-img flex-row-center">
                <image
                  style="height: 75rpx; width: 75rpx"
                  src="../../static/robt.png"
                  mode="aspectFit"
                ></image>
              </view>
              <view class="message-content" @click="copyFn(x.msg)">
                <view class="message-text bg-f9f9f9">
                  <text>{{ x.msg }}</text>
                </view>
              </view>
            </view>
          </view>
          <!-- loading是显示 -->
          <view v-show="msgLoad" class="robot-message">
            <view class="chat-robot-img flex-row-center">
              <image
                style="height: 75rpx; width: 75rpx"
                src="../../static/robt.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="message-content" @click="copyFn(x.msg)">
              <view class="message-text bg-f9f9f9">
                <view class="cursor"></view>
              </view>
            </view>
          </view>
          <!-- 防止消息底部被遮 -->
          <view style="height: 130rpx"></view>
        </view>
      </scroll-view>

      <!-- 底部导航栏 -->
      <view
        class="bottom-navigation"
        style="position: fixed; bottom: 0px; width: 100%"
      >
        <view class="bottom-bar flex-row-around" style="font-size: 55rpx">
          <!-- vue无法使用软键盘"发送" -->
          <input
            v-model="msg"
            class="input-field"
            type="text"
            style="background-color: #f0f0f0; font-size: 25rpx"
            @confirm="sendMsg"
            confirm-type="search"
            placeholder-class="placeholder-text"
            placeholder="用一句简短的话描述您的问题"
          />
          <button
            @click="sendMsg"
            :disabled="msgLoad"
            class="send-button bg-cyan round"
          >
            发送
          </button>
        </view>
      </view>
    </view>
    <uni-tabbar :tabCurrent="2"></uni-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msgLoad: true,
      anData: {},
      userId: "",
      animationData: {},
      showTow: false,
      msgList: [
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        },
        {
          my: true,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        }
      ],
      msgContent: "",
      msg: "",
      ptzt: 1
    };
  },
  onLoad() {
    uni.hideTabBar()
  },
  methods: {}
};
</script>

<style>
.bg {
  padding: 20rpx;
  background-color: rgb(240, 240, 240);
}

.chat-robot-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rpx;
}

.chat-user-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10rpx;
}

.message-container {
  display: flex;
  flex-direction: column;
}

.user-message {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20rpx;
}

.robot-message {
  display: flex;
  margin-bottom: 20rpx;
}

.message-content {
  width: 500rpx;
}

.message-text {
  padding: 10px;
  border-radius: 35rpx;
}

.bg-cyan {
  background-color: rgb(71, 188, 180); /* 修改为适当的颜色值 */
}

.bg-f9f9f9 {
  background-color: #f9f9f9;
}

.loading-message {
  display: flex;
}

.bottom-navigation {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.bottom-bar {
  display: flex;
}

.input-field {
  flex: 1;
  background-color: #f0f0f0;
  font-size: 25rpx;
}

.placeholder-text {
  /* 根据需要设置 */
}

.send-button {
  /* 根据需要设置 */
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #000000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
