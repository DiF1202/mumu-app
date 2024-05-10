<template>
  <view class="list-container">
    <uni-navtopbar title="远程巡视" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
      <view class="video-section">
        <!-- <web-view
          :webview-styles="webviewStyles"
          src="http://127.0.0.1:5500/src/static/html/player.html"
          @load="handleLoad"
          @error="handleError"
        ></web-view> -->
      </view>
      <view class="warin-section">
        <u-list
          @scrolltolower="loadmore"
          lowerThreshold="100"
          :height="windowHeight - 372"
        >
          <u-list-item v-for="(item, index) in listData" :key="index">
            <view class="list-item" @click="enterDetails">
              <u--image
                :showLoading="true"
                src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"
                width="320rpx"
                height="210rpx"
              ></u--image>
              <view class="item-info">
                <view class="item-header"></view>
                <u--text
                  :text="item.title"
                  size="36rpx"
                  color="#333333"
                  :bold="true"
                ></u--text>
                <u--text
                  :text="'时间：' + item.time"
                  size="28rpx"
                  color="#333333"
                ></u--text>
                <view class="status-tag">
                  <u-tag
                    :text="item.status === '1' ? '已处理' : '未处理'"
                    :type="item.status === '1' ? 'success' : 'error'"
                    shape="circle"
                    size="mini"
                  ></u-tag>
                </view>
              </view>
            </view>
          </u-list-item>
          <u-loadmore
            :status="laoding"
            loadingIcon="semicircle"
            height="88rpx"
            fontSize="32rpx"
            @loadmore="loadmore"
          />
        </u-list>
      </view>
      <view class="ding">
        <u-icon name="arrow-upward" size="38rpx" color="#10cc8f"></u-icon>
      </view>
    </view>
    <uni-tabbar :tabCurrent="2"></uni-tabbar>
  </view>
</template>

<script>
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      webviewStyles: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        progress: {
          color: "#FF3333"
        }
      },
      columns: [
        {
          id: 2,
          label: "牧场2",
          children: [
            { id: 21, label: "厂1", children: [{ id: 1, label: "栏1" }] },
            { id: 22, label: "厂2" }
          ]
        }
      ],
      listData: [
        {
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          title: "死亡告警",
          status: "2",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          title: "死亡告警",
          status: "2",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        }
      ],
      pageNum: 1,
      laoding: "loadmore"
    };
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight;
    }
  },
  onLoad() {
    uni.hideTabBar();
  },
  methods: {
    treeCallback(value) {
      this.fieldId = value.id[0];
    },
    handleLoad() {
      console.log("Webview loaded successfully.");
    },
    handleError(e) {
      console.log(e);
    },
    loadmore() {
      this.pageNum += 1;
      console.log(this.laoding);
      if (this.laoding == "loadmore") {
        this.getList();
      }
    },
    getList() {
      this.laoding = "loading";
      // setTimeout(() => {
      //   for (let i = 0; i < 3; i++) {
      //     console.log(i);
      //     this.listData.push({
      //       title: "环境异常",
      //       status: "1",
      //       build: "一厂/2栏/3圈",
      //       time: "2022-12-12 12:12"
      //     });
      //   }
      //   this.laoding = "loadmore";
      // }, 2000);
    },
    selectStatus(item) {
      this.status = item.id;
    },
    enterDetails() {
      uni.navigateTo({ url: "/pages/view/components/details/index" });
    }
    // initPlayer() {
    //   console.log(Flv);
    //   const player = new Player({
    //     container: "#mui-player", // 这里用选择器代替 DOM 引用
    //     live: true,
    //     src: "https://flvplayer.js.org/assets/video/weathering-with-you.flv",
    //     parse: {
    //       type: "flv",
    //       loader: Flv,
    //       config: {
    //         cors: true
    //       }
    //     }
    //   });
    // }
  },
  mounted() {
    // this.initPlayer();
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    padding: 0 24rpx 24rpx;
    .video-section {
      width: 100%;
      height: 400rpx;
      background: #333333;
      margin-bottom: 24rpx;
      position: relative;
      overflow: hidden;
    }
    .ding {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      position: absolute;
      right: 24rpx;
      bottom: 100rpx;
      background: #d6e7ff;
      display: flex;
      justify-content: center;
      align-self: center;
    }
    .warin-section {
      .list-item {
        width: 100%;
        height: 258rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24rpx;
        padding: 24rpx;
        // background: #deebff;
        box-shadow: 0px 0px 10px #deebff inset;
        border-radius: 16rpx;
        .item-info {
          height: 210rpx;
          margin-left: 24rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          position: relative;
          .status-tag {
            width: 108rpx;
            margin: 12rpx 0;
          }
          .select-item {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
