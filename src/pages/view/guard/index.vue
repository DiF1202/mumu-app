<template>
  <view class="list-container">
    <view> </view>

    <view class="section">
      <view class="section-title">实时监控</view>
      <view class="section-video">
        <view id="mui-player"></view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">告警事件</view>
      <u-list
        @scrolltolower="loadmore"
        lowerThreshold="100"
        :height="windowHeight - listHeight"
      >
        <u-list-item
          class="list"
          v-for="(item, index) in listData"
          :key="index"
        >
          <view class="list-item" @click="enterDetails">
            <view class="item-header">
              <u--text
                suffixIcon="arrow-right"
                iconStyle="font-size: 18px; color: #333333; font-weight:bold"
                :text="item.title"
                size="36rpx"
                color="#333333"
                :bold="true"
              ></u--text>
              <view class="status">
                <view class="status-item">未处理</view>
              </view>
            </view>
            <view class="item-content">
              <image
                class="item-content-img"
                src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"
              ></image>
              <view>
                <uni-cellItem title="位置：" :value="item.build"></uni-cellItem>
                <uni-cellItem title="时间：" :value="item.time"></uni-cellItem>
              </view>
            </view>
          </view>
        </u-list-item>
        <u-loadmore
          :status="laoding"
          loadingIcon="semicircle"
          height="88"
          fontSize="32rpx"
          @loadmore="loadmore"
        />
      </u-list>
    </view>
    <uni-tabbar :tabCurrent="1"></uni-tabbar>
  </view>
</template>

<script>
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      searchValue: "",
      filterPanel: false,
      listData: [
        {
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        },
        {
          title: "死亡告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        },
        {
          title: "环境异常",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        },
        {
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        },
        {
          title: "死亡告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        },
        {
          title: "环境异常",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12"
        }
      ],
      pageNum: 1,
      laoding: "loadmore",
      oneLevel: [
        { label: "全部", id: "0" },
        { label: "一厂", id: 1 },
        { label: "二厂", id: 2 },
        { label: "三厂", id: 3 },
        { label: "四厂", id: 4 }
      ],
      twoLevel: [
        { label: "全部", id: "0" },
        { label: "一栏", id: 1 },
        { label: "二栏", id: 2 },
        { label: "三栏", id: 3 },
        { label: "四栏", id: 4 }
      ],
      threeLevel: [
        { label: "全部", id: "0" },
        { label: "一圈", id: 1 },
        { label: "二圈", id: 2 }
      ],
      status: "",
      state: ""
    };
  },

  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight;
    },
    listHeight() {
      let safe = uni.getSystemInfoSync().safeAreaInsets;
      return safe.top + safe.bottom;
    }
  },
  onLoad() {
    uni.hideTabBar()
  },
  methods: {
    loadmore() {
      this.pageNum += 1;
      if (this.laoding == "loadmore") {
        this.getList();
      }
    },
    getList() {
      this.laoding = "loading";
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          console.log(i);
          this.listData.push({
            title: "环境异常",
            status: "1",
            build: "一厂/2栏/3圈",
            time: "2022-12-12 12:12"
          });
        }
        this.laoding = "loadmore";
      }, 2000);
    },
    selectStatus(item) {
      this.status = item.id;
    },
    enterDetails() {
      uni.navigateTo({ url: "/pages/view/components/details/index" });
    },
    initPlayer() {
      const player = new Player({
        container: "#mui-player", // 这里用选择器代替 DOM 引用
        live: true,
        src: "https://flvplayer.js.org/assets/video/weathering-with-you.flv"
        // parse: {
        //   type: "flv",
        //   loader: Flv,
        //   config: {
        //     cors: true,
        //   },
        // },
      });
    }
  },
  mounted() {
    this.initPlayer();
  }
};
</script>

<style lang="scss" scoped>
.list-container {
}
.search-view {
  padding: 12rpx 24rpx;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .search-input {
    width: 80%;
    background: #f5f5f5;
    color: #333333;
  }
  .filter-panel {
    width: 100%;
    position: absolute;
    left: 0;
    top: 96rpx;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    .filter-panel-content {
      background-color: #ffff;
      padding: 0 30rpx 30rpx;
      .filter-title {
        color: #000000;
        font-size: 30rpx;
        font-weight: 500;
        padding: 30rpx 0;
      }
      .state-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .state-item {
          width: 210rpx;
          height: 72rpx;
          border: 1rpx solid rgba(0, 0, 0, 0.25);
          border-radius: 72rpx;
          text-align: center;
          line-height: 72rpx;
          margin: 0 20rpx 20rpx 0;
          font-size: 28rpx;
          color: #000000;
        }
        .active {
          background-color: rgba(222, 241, 255, 1);
          border: 1rpx solid rgba(22, 119, 255, 1);
        }
      }
    }
    .btn-box {
      display: flex;
      padding: 24rpx 30rpx;
      background-color: #fff;
      box-shadow: 0rpx -10rpx 20rpx #eeeeee;
    }
  }
}
.list {
  margin-top: 20rpx;
}
.list-item {
  /* padding: 24rpx; */
  /* margin: 24rpx; */
  margin-bottom: 24rpx;
  border-radius: 16rpx;
  background-color: #fff;
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16rpx;
    .status {
      .status-item {
        width: 120rpx;
        height: 44rpx;
        text-align: center;
        line-height: 44rpx;
        border-radius: 4rpx;
        color: rgba(255, 85, 51, 1);
        background-color: rgba(255, 85, 51, 0.2);
        font-size: 24rpx;
      }
    }
  }
  .item-content {
    display: flex;
    .title {
      width: 50rpx;
    }
  }
  .item-content-img {
    height: 180rpx;
    width: 300rpx;
    margin-right: 20rpx;
  }
}
.section {
  margin: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 8rpx;
  .section-title {
    width: 160rpx;
    color: #333333;
    line-height: 44rpx;
    font-size: 30rpx;
    border-left: 6rpx solid #2681ff;
    padding-left: 26rpx;
    font-weight: bold;
  }
  .section-video {
    margin-top: 20rpx;
  }
  .form-view {
    padding: 20rpx 0rpx 0 10rpx;
    .form-btn {
      padding-top: 20rpx;
    }
  }
}
</style>
