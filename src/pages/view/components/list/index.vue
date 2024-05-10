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
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <video id="myVideo" :src="item.video_url" controls class="video-play"></video>
              <!-- <u--image :showLoading="true" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" width="320rpx" height="210rpx"></u--image> -->
              <view class="item-info">
                <view>
                  <u--text :text="item.alarm_name" size="36rpx" color="#333333" :bold="true"></u--text>
                </view>
                <view>
                  <u--text :text="'时间：' + item.alarm_time" size="28rpx" color="#333333"></u--text>
                </view>
                <view class="status-tag">
                  <u--text :text="'状态：'" size="28rpx" color="#333333"></u--text>
                  <u--text :text="item.alarm_status" size="28rpx" :color="item.alarm_status === '已处理' ? '#5ac725' : '#f56c6c'"></u--text>
                </view>
                <view class="status-tag">
                  <u-tag text="查看详情" type="success" shape="circle" size="mini"></u-tag>
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
import { findAndAdd, timeHandler } from '@/utils/common.js'
import { videoAlarmApi, dingApi } from '@/api/view.js'
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      columns: [], // 树形选择器数据
      videoUrl: '', // 视频url
      listData: [], // 列表数据
      limit: 5,
      page: 1,
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
        this.listData = []
        this.getList()
      }
    },
    getList() {
      this.laoding = "loading";
      videoAlarmApi({ pen_id: this.fieldId, page: this.page, limit: this.limit }).then(res => {
        if (res.code == 200) {
          res.data.alarm_data.map(item => {
            item.alarm_time = timeHandler(item.alarm_time)
          })
          this.videoUrl = res.data.video_url
          this.listData = this.listData.concat(res.data.alarm_data)
          if (this.listData.length < res.data.total) {
            this.status = 'loadmore'
          } else {
            this.status = 'nomore'
          }
        }
      }).catch(() => {
        this.status = 'nomore'
      })
    },
    loadmore() {
      this.page += 1;
      if (this.laoding == "loadmore") {
        this.getList()
      }
    },
    dingClick(id) {
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
        .video-play {
          width: 280rpx;
          height: 210rpx;
        }
        .item-info {
          height: 210rpx;
          margin-left: 24rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          position: relative;
          .status-tag {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          // .select-item {
          //   position: absolute;
          //   top: 0;
          //   right: 0;
          // }
        }
      }
    }
  }
}
</style>
