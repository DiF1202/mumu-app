<template>
  <view class="dailyReport-container">
    <uni-navtopbar title="每日一报" :back="true"></uni-navtopbar>
    <view v-if="isLoading" class="loading-container">
      <view class="spinner"></view>
    </view>
    <view v-else class="content">
      <view v-for="(item, index) in sections" :key="index">
        <uni-subTitle
          v-if="isSubTitleVisible(index)"
          :customIcon="item.icon"
          :title="item.title"
        />
        <view
          v-for="(textItem, textIndex) in item.texts"
          :key="textIndex"
          class="daily-item"
        >
          <view v-if="isDotVisible(index, textIndex)" class="dot"></view>
          <view class="typing-text">{{ formattedText[index][textIndex] }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getAiReportDaily } from "@/api/home.js";

export default {
  data() {
    return {
      isLoading: true, // 是否正在加载
      currentTextIndex: 0, // 当前输出文本段索引
      typingSpeed: 20, // 打字速度，每个字符的延迟时间
      sections: [],
      formattedText: [] // 格式化后的文本
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAiReportDaily()
        .then(response => {
          if (response.code === 200) {
            this.transformData(response.data);
          } else {
            // 处理错误情况
            console.error("Error fetching data:", response.msg);
          }
          this.isLoading = false;
          this.startTyping();
        })
        .catch(error => {
          console.error("API call failed:", error);
        });
    },
    transformData(data) {
      this.sections = [
        {
          title: "过去24h总结",
          icon: "houres",
          texts: data.day_summary.map(entry => {
            const renderContent = entry?.title
              ? entry?.title + "：" + entry?.content
              : entry?.content;
            return renderContent;
          })
        },
        {
          title: "动物监控与健康",
          icon: "camera",
          texts: data.animal.map(entry => {
            const renderContent = entry?.title
              ? entry?.title + "：" + entry?.content
              : entry?.content;
            return renderContent;
          })
        },
        {
          title: "设置与安全管理",
          icon: "safement",
          texts: data.manage.map(entry => {
            const renderContent = entry?.title
              ? entry?.title + "：" + entry?.content
              : entry?.content;
            return renderContent;
          })
        },
        {
          title: "未来建议",
          icon: "suggestion",
          texts: data.suggestions.map(entry => {
            const renderContent = entry?.title
              ? entry?.title + "：" + entry?.content
              : entry?.content;
            return renderContent;
          })
        }
      ];
      this.initData();
    },
    initData() {
      this.formattedText = this.sections.map(section =>
        Array(section.texts.length).fill("")
      );
    },
    startTyping() {
      this.typeText(0, 0);
    },
    typeText(sectionIndex, textIndex) {
      if (sectionIndex >= this.sections.length) return;
      if (textIndex >= this.sections[sectionIndex].texts.length) {
        this.typeText(sectionIndex + 1, 0);
        return;
      }
      let text = this.sections[sectionIndex].texts[textIndex];
      let charIndex = 0;
      const typeCharacter = () => {
        if (charIndex < text.length) {
          this.$set(
            this.formattedText[sectionIndex],
            textIndex,
            this.formattedText[sectionIndex][textIndex] + text[charIndex]
          );
          charIndex++;
          setTimeout(typeCharacter, this.typingSpeed);
        } else {
          this.typeText(sectionIndex, textIndex + 1);
        }
      };
      typeCharacter();
    },
    isDotVisible(sectionIndex, textIndex) {
      return this.formattedText[sectionIndex][textIndex].length > 0;
    },
    isSubTitleVisible(sectionIndex) {
      return this.formattedText[sectionIndex].some(text => text.length > 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.dailyReport-container {
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .spinner {
      border: 8rpx solid #f3f3f3; /* Light grey */
      border-top: 8rpx solid #3498db; /* Blue */
      border-radius: 50%;
      width: 60rpx;
      height: 60rpx;
      animation: spin 2s linear infinite;
    }
  }
  .content {
    /* background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx); */
    padding: 0 24rpx 48rpx;
    .daily-item {
      display: flex;
      justify-content: flex-start;
      align-self: flex-start;
      .dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background-color: #00443a;
        margin: 22rpx 0;
      }
      .typing-text {
        color: #0f4239;
        font-size: 28rpx;
        margin: 12rpx;
        max-width: 660rpx;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
