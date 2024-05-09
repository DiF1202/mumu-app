<template>
  <view class="bg">
    <view class="content">
      <uni-navtopbar title="畜牧助手" :back="true"></uni-navtopbar>

      <scroll-view
        class="msg-list"
        :scroll-into-view="scrollIntoView"
        scroll-with-animation
        scroll-y="true"
        style="width: 100%"
        :enable-flex="true"
      >
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
                  src="../../static/icon/woman.png"
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
                  src="../../static/icon/logo.png"
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
          <view v-if="msgLoad" class="robot-message">
            <view class="chat-robot-img flex-row-center">
              <image
                style="height: 75rpx; width: 75rpx"
                src="../../static/icon/logo.png"
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
        </view>
        <!-- 最后一个最新元素用来定位滚动 -->
        <view id="last-msg-item" style="height: 1px"></view>
      </scroll-view>

      <!-- 底部导航栏 -->
      <view class="foot-box">
        <view class="foot-box-content">
          <view class="textarea-box">
            <textarea
              v-model="msgContent"
              :cursor-spacing="15"
              class="textarea"
              :auto-height="true"
              placeholder="请输入要你的问题"
              :maxlength="-1"
              :adjust-position="false"
              :disable-default-padding="false"
              placeholder-class="input-placeholder"
            ></textarea>
          </view>
          <view class="send-btn-box">
            <button
              @click="send"
              :disabled="inputBoxDisabled || !msgContent"
              class="send"
              type="primary"
            >
              发送
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- <uni-tabbar :tabCurrent="2"></uni-tabbar> -->
  </view>
</template>

<script>
// import { getChatApi } from "@/api/home.js";
// import { getChatApi } from "@/api/home.js";

export default {
  data() {
    return {
      msgLoad: false,
      anData: {},
      userId: "",
      animationData: {},
      showTow: false,
      msgList: [
        {
          my: false,
          msg: "你好我是畜牧助手,请问有什么问题可以帮助您?"
        }
      ],
      msgContent: "",
      msg: "",
      ptzt: 1,
      keyboardHeight: 0,
      // 使聊天窗口滚动到指定元素id的值
      scrollIntoView: ""
    };
  },
  onLoad() {
    // uni.hideTabBar();
  },
  computed: {
    footBoxPaddingBottom() {
      return (this.keyboardHeight || 20) + "rpx";
    }
  },
  methods: {
    // 滚动窗口以显示最新的一条消息
    showLastMsg() {
      // 等待DOM更新
      this.$nextTick(() => {
        // 将scrollIntoView属性设置为"last-msg-item"，以便滚动窗口到最后一条消息
        this.scrollIntoView = "last-msg-item";
        console.log("读取scroll高度 ", this.scrollIntoView);
        // 等待DOM更新，即：滚动完成
        this.$nextTick(() => {
          // 将scrollIntoView属性设置为空，以便下次设置滚动条位置可被监听
          this.scrollIntoView = "";
        });
      });
    },
    // 清空消息列表
    clearAllMsg(e) {
      // 弹出确认清空聊天记录的提示框
      uni.showModal({
        title: "确认要清空聊天记录？",
        content: "本操作不可撤销",
        complete: e => {
          // 如果用户确认清空聊天记录
          if (e.confirm) {
            // 将消息列表清空
            this.msgList.splice(0, this.msgList.length);
          }
        }
      });
    },
    send() {
      // getChatApi();
      const curUserMsgList = [
        {
          my: true,
          msg: this.msgContent
        }
      ];
      const curAnswerList = [
        {
          my: false,
          msg: "测试回答"
        }
      ];
      //清空输入框
      this.msgContent = "";
      this.msgList = this.msgList.concat(curUserMsgList);
      this.msgLoad = true;
      this.showLastMsg();

      //模拟一秒后关闭loading
      setTimeout(() => {
        this.msgLoad = false;
        this.msgList = this.msgList.concat(curAnswerList);
        this.showLastMsg();
      }, 2000);
      console.log(this.msgContent);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  /* padding: 20rpx; */
  height: 100vh;
  background-color: rgb(240, 240, 240);
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100%;
    .msg-list {
      flex: 1;
      padding: 24rpx 24rpx 0 24rpx;
      overflow: hidden;
    }
  }
}

/* 底部 */
.foot-box {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  background-color: #fff;
  background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
}

.foot-box-content {
  display: flex;
  justify-content: space-around;
}

.textarea-box {
  padding: 8px 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.textarea-box .textarea {
  max-height: 120px;
  font-size: 14px;
  /* #ifndef APP-NVUE */
  overflow: auto;
  /* #endif */
  width: 450rpx;
  font-size: 14px;
}

/* #ifdef H5 */
/*隐藏滚动条*/
.textarea-box .textarea::-webkit-scrollbar {
  width: 0;
}
/* #endif */

.trash,
.send {
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.send {
  color: #fff;
  border-radius: 4px;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 14px;
  margin-right: 20rpx;
}

/* #ifndef APP-NVUE */
.send::after {
  display: none;
}

/* #endif */

/* 其他 */
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
  background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
}

.bg-f9f9f9 {
  background-color: #f9f9f9;
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

.bottom-navigation {
  position: fixed;
  bottom: 0px;
  width: 100%;
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
