<template>
  <view class="list-container">
    <uni-navtopbar title="实况视频" :back="true"></uni-navtopbar>
    <view class="content" :style="{height: `${windowHeight - safetyTop - 40}px`}">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback"/>
      <view class="video-section">
        <view id="mui-player"></view>
      </view>
      <view class="warin-section">
        <u-list
          @scrolltolower="loadmore"
          lowerThreshold="100"
          height="100%"
        >
          <u-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <view class="list-item" @click="enterDetails(item.id)">
              <u--image :showLoading="true" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" width="320rpx" height="210rpx"></u--image>
              <view class="item-info">
                <view class="item-header"></view>
                <u--text :text="item.title" size="36rpx" color="#333333" :bold="true"></u--text>
                <u--text :text="'时间：' + item.time" size="28rpx" color="#333333"></u--text>
                <view class="status-tag">
                  <u-tag :text="item.status === '1' ? '已处理' : '未处理'" :type="item.status === '1' ? 'success' : 'error'" shape="circle" size="mini"></u-tag>
                </view>
                <!-- <view class="select-item">
                  <u-checkbox-group v-model="item.select">
                    <u-checkbox :name="item.id" label=""></u-checkbox>
                  </u-checkbox-group>
                </view> -->
              </view>
              <view class="ding" @click.stop="dingClick(item.id)">
                <u-icon name="bell-fill" size="38rpx" color="#10cc8f"></u-icon>
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
      <view class="upward" @click="upwardClick">
        <u-icon name="arrow-upward" size="38rpx" color="#10cc8f"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { fieldTree } from '@/api/utils.js'
import { findAndAdd } from '@/utils/common.js'
import { videoAlarmApi, dingApi } from '@/api/view.js'
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      columns: [],
      selectAlarm: [],
      listData: [
        {
          id: 1,
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          id: 2,
          title: "死亡告警",
          status: "2",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          id: 3,
          title: "濒死告警",
          status: "1",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        },
        {
          id: 4,
          title: "死亡告警",
          status: "2",
          build: "一厂/2栏/3圈",
          time: "2022-12-12 12:12",
          select: []
        }
      ],
      pageNum: 1,
      laoding: "loadmore",
      
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight;
    },
    safetyTop() {
      return uni.getSystemInfoSync().safeAreaInsets.top
    },
  },
  onLoad(options) {
    this.getFieldTree(options.fieldId)
  },
  methods: {
    getFieldTree(id) {
      // 获取栏位数据 并设置默认选中
      fieldTree().then(res => {
        if (res.code === 200) {
          let newTree = findAndAdd(res.data, id,'checked', true)
          this.columns = newTree
        }
      })
    },
    treeCallback(value) {
      this.fieldId = value.id[0]
      if (this.fieldId) {
        this.getList()
      }
    },
    getList() {
      this.laoding = "loading";
      setTimeout(() => {
        videoAlarmApi({ pen_id: this.fieldId }).then(res => {
          console.log(res)
        })
        this.laoding = "loadmore";
      }, 2000);
    },
    loadmore() {
      this.pageNum += 1;
      if (this.laoding == "loadmore") {
        this.getList()
      }
    },
    dingClick(id) {
      // dingApi({ id: id }).then(res => {
      //   if (res.code == 200) {
      //     uni.showToast({
      //       icon: null,
      //       title: '提醒成功'
      //     })
      //   }
      // })
      console.log(id)
    },
    upwardClick() {
      uni.navigateTo({ url: "/pages/view/components/reporting/index" })
    },
    enterDetails(id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id })
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
    // this.initPlayer();
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  .content {
    background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
    padding: 0 24rpx 24rpx;
    .ding {
      position: absolute;
      right: 24rpx;
      top: 38rpx;
    }
    .upward {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      position: absolute;
      right: 24rpx;
      bottom: 360rpx;
      background: #D6E7FF;
      display: flex;
      justify-content: center;
      align-self: center;
    }
    .video-section {
      width: 100%;
      height: 400rpx;
      background: #333333;
      margin-bottom: 24rpx;
    }
    .warin-section {
      height: calc(100% - 584rpx);
      .list-item {
        width: 100%;
        height: 258rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24rpx;
        padding: 24rpx;
        box-shadow: 0px 0px 10px #deebff inset;
        border-radius: 16rpx;
        position: relative;
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
