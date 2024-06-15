<template>
  <view class="bg">
    <view class="content">
      <uni-navtopbar title="小牧AI助手" :back="true"></uni-navtopbar>

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
                  src="https://m.zzxmt.cn/cdn/icon/woman.png"
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
                  src="https://m.zzxmt.cn/cdn/icon/logo.png"
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
                src="https://m.zzxmt.cn/cdn/icon/logo.png"
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
      <view class="foot-box-shadow"></view>
      <view class="foot-box" :style="{ bottom: keyboardHeight + 'px' }">
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
              @focus="handleFocus"
              @blur="handleBlur"
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
  </view>
</template>

<script>
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
          msg: "你好我是小牧AI助手,请问有什么问题可以帮助您?",
          id: this.uuid()
        }
      ],
      msgContent: "",
      msg: "",
      ptzt: 1,
      keyboardHeight: 0,
      // 使聊天窗口滚动到指定元素id的值
      scrollIntoView: "",
      inputBoxDisabled: false
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
    handleFocus(event) {
      // 获取键盘高度
      this.keyboardHeight = event.detail.height || 0;

      // 滚动到最新消息
      this.showLastMsg();
    },
    handleBlur() {
      // 收起键盘后，恢复页面滚动
      this.keyboardHeight = 0;
      this.showLastMsg();
    },
    // 滚动窗口以显示最新的一条消息
    showLastMsg() {
      // 等待DOM更新
      this.$nextTick(() => {
        // 将scrollIntoView属性设置为"last-msg-item"，以便滚动窗口到最后一条消息
        this.scrollIntoView = "last-msg-item";
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
    // uuid生存
    uuid() {
      var uuid = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        uuid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      uuid[14] = "4";
      uuid[19] = hexDigits.substr((uuid[19] & 0x3) | 0x8, 1);
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      return "u" + uuid.join("").replaceAll("-", "");
    },
    decodeUint8Array(array) {
      let result = "";
      for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
      }
      return decodeURIComponent(escape(result));
    },

    // 在流接收数据时调用此方法
    updateMessage(id, content) {
      let existingMsgIndex = this.msgList.findIndex(item => item?.id === id);
      if (existingMsgIndex !== -1) {
        // 更新已有消息的内容
        this.$set(this.msgList, existingMsgIndex, {
          my: false,
          msg: content,
          id: id
        });
      } else {
        // 如果消息列表中没有，就添加一个新的消息条目
        this.msgList.push({
          my: false,
          msg: content,
          id: id
        });
      }
      // 更新消息后滚动到最新消息
      this.showLastMsg();
    },

    async getChat(userQueryString, curUserMsgId) {
      const self = this; // 在函数外部捕获this
      let id = this.uuid();

      // 重置 completeResponse 和 self.buffer
      self.completeResponse = ""; // 用来拼接流式传输分片的完整内容
      self.buffer = ""; // 初始化缓冲区用于存储未处理的文本块

      const requestTask = uni.request({
        url: "http://47.99.151.88:9004/chat/knowledge_base_chat",
        method: "POST",
        responseType: "text",
        enableChunked: true, // 开启流传输
        data: {
          query: userQueryString,
          knowledge_base_name: "behavior",
          top_k: 3,
          score_threshold: 1,
          stream: true,
          model_name: "mumu-dev",
          temperature: 0.7,
          max_tokens: 0,
          prompt_name: "default",
          person_id: curUserMsgId
        },
        success: function (res) {
          console.log("流结束了");
          self.inputBoxDisabled = false;
          self.msgLoad = false;
          if (res.statusCode !== 200) {
            self.inputBoxDisabled = false;
            // 如果失败了看看看有没有，上一条记录有无返回看看有没有存进去了
            let existingMsgIndex = self.msgList.findIndex(
              item => item?.id === id
            );
            self.msgLoad = false;
            if (existingMsgIndex !== -1) {
              // 更新已有消息的内容
              self.$set(self.msgList, existingMsgIndex, {
                my: false,
                msg: "请求失败，请重试",
                id: id
              });
            } else {
              // 如果消息列表中没有，就添加一个新的消息条目
              self.msgList.push({
                my: false,
                msg: "请求失败，请重试",
                id: id
              });
            }
          }
          setTimeout(() => {
            console.log("延迟滚动");
            self.showLastMsg();
          }, 300);
        },
        fail: function (err) {
          console.log(err);
          self.inputBoxDisabled = false;
          // 如果失败了看看看有没有，上一条记录有无返回看看有没有存进去了
          let existingMsgIndex = self.msgList.findIndex(
            item => item?.id === id
          );
          self.msgLoad = false;
          if (existingMsgIndex !== -1) {
            // 更新已有消息的内容
            self.$set(self.msgList, existingMsgIndex, {
              my: false,
              msg: "请求失败，请重试",
              id: id
            });
          } else {
            // 如果消息列表中没有，就添加一个新的消息条目
            self.msgList.push({
              my: false,
              msg: "请求失败，请重试",
              id: id
            });
          }
          self.showLastMsg();
        }
      });

      // 初始化模式
      const pattern = /data: (\{.*?\})/g;

      requestTask.onChunkReceived(function (res) {
        self.msgLoad = false;

        // 读取接收到的数据块并拼接到缓冲区中
        const textChunk = self.decodeUint8Array(new Uint8Array(res.data));
        self.buffer += textChunk;

        let match;
        let lastIndex = 0; // 记录上一次处理的位置

        // 处理缓冲区中的数据
        while ((match = pattern.exec(self.buffer)) !== null) {
          const jsonStr = match[1];
          try {
            const data = JSON.parse(jsonStr);
            if (data.answer) {
              self.completeResponse += data.answer;
              self.updateMessage(id, self.completeResponse);
              console.log(`更新消息: ${self.completeResponse}`);
            }
            lastIndex = pattern.lastIndex; // 记录最后一次匹配的位置
          } catch (e) {
            console.error("JSON 解析错误: ", e);
            self.showLastMsg();
          }
        }

        // 移除已处理的部分
        self.buffer = self.buffer.slice(lastIndex);
      });
    },
    async send() {
      const curUserMsgId = this.uuid();
      this.getChat(this.msgContent, curUserMsgId);

      const curUserMsgList = [
        {
          my: true,
          msg: this.msgContent,
          id: curUserMsgId
        }
      ];
      this.msgLoad = true;
      this.inputBoxDisabled = true;
      //清空输入框
      this.msgList = this.msgList.concat(curUserMsgList);
      this.msgContent = "";
      this.handleBlur();
      this.showLastMsg();
      console.log("发送调用刷新");
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  /* padding: 20rpx; */
  height: 100vh;
  // background-color: rgb(240, 240, 240);
  // background: #f4f4f4;
  .content {
    position: relative;
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100%;
    .msg-list {
      flex: 1;
      padding: 30rpx 30rpx 0 30rpx;
      overflow: hidden;
    }
  }
}

/* 底部 */
.foot-box {
  position: absolute;
  bottom: 0rpx;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
  background-color: #fff;
  background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
}

.foot-box-shadow {
  height: 120rpx;
  width: 100%;
}

.foot-box-content {
  display: flex;
  justify-content: space-around;
  align-content: center;
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
  width: 500rpx;
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
  /* align-items: center; */
  justify-content: center;
  margin-right: 20rpx;
  border-radius: 20rpx;
}

.chat-user-img {
  display: flex;
  /* align-items: center; */
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
  border-radius: 20rpx;
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
