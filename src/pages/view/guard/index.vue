<template>
  <view class="list-container">
    <uni-navtopbar title="远程监控" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
      <u-gap height="12rpx"></u-gap>
      <!-- <uni-subTitle
        icon="order"
        title="畜舍情况"
        value="实况视频"
        url="pages/video/index"
      /> -->
      <uni-card v-if="this.videoUrl" margin="0" padding="0" spacing="24rpx">
        <view class="video-wrapper">
          <video
            v-if="this.videoUrl"
            id="myVideo"
            :src="this.videoUrl"
            autoplay
            controls
            is-live
            class="video-section"
          ></video>
          <view class="live-icon">
            <u-icon name="live" size="28rpx" color="#FF0000"></u-icon>
          </view>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <view class="warin-section">
        <u-list @scrolltolower="loadmore" lowerThreshold="100" height="100%">
          <u-list-item v-for="(item, index) in listData" :key="index">
            <uni-card margin="0" padding="0" spacing="24rpx">
              <view class="list-item" @click="enterDetails(item.alarm_id)">
                <view class="image-wrapper">
                  <u--image
                    class="responsive-image"
                    :showLoading="true"
                    :src="item.poster_url"
                    width="280rpx"
                    height="158rpx"
                  ></u--image>
                </view>
                <view class="item-info">
                  <view>
                    <u--text
                      :text="item.alarm_name"
                      size="32rpx"
                      color="#333333"
                      :bold="true"
                    ></u--text>
                  </view>
                  <view>
                    <u--text
                      :text="'时间：' + item.alarm_time"
                      size="26rpx"
                      color="#333333"
                    ></u--text>
                  </view>
                  <view class="tag-box">
                    <view style="margin-right: 12rpx">
                      <u-tag
                        :text="item.alarm_status"
                        :type="
                          item.alarm_status === '已处理' ? 'success' : 'error'
                        "
                        shape="circle"
                        size="mini"
                      ></u-tag>
                    </view>
                    <view>
                      <u-tag
                        :text="item.report_type == 1 ? 'AI识别' : '自主上报'"
                        shape="circle"
                        size="mini"
                      ></u-tag>
                    </view>
                  </view>
                  <!-- <view class="select-item">
                    <u-checkbox-group v-model="item.select">
                      <u-checkbox :name="item.id" label=""></u-checkbox>
                    </u-checkbox-group>
                  </view> -->
                </view>
                <!-- <view class="ding" @click.stop="dingClick(item.id)">
                  <u-icon name="bell-fill" size="38rpx" color="#00443A"></u-icon>
                </view> -->
              </view>
            </uni-card>
            <u-gap height="12rpx"></u-gap>
          </u-list-item>
          <u-loadmore
            :status="loading"
            loadingIcon="semicircle"
            height="88rpx"
            fontSize="32rpx"
            @loadmore="loadmore"
          />
          <u-gap height="80rpx"></u-gap>
        </u-list>
      </view>
      <view class="upward" :style="{ bottom: safetyBottom + 62 + 'px' }">
        <!-- <u-icon name="arrow-upward" size="38rpx" color="#00443A"></u-icon> -->
        <u-button
          color="#10cc8F"
          type="primary"
          shape="circle"
          text="自主上报"
          @click="upwardClick"
        ></u-button>
      </view>
    </view>
    <uni-tabbar :tabCurrent="1" ref="tabBarRef"></uni-tabbar>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { fieldTree, alarmUnhandlerNumApi } from "@/api/utils.js";
import { addTreePro } from "@/utils/common.js";
import { videoAlarmApi } from "@/api/view.js";
import { userStore } from "@/store";
export default {
  data() {
    return {
      videoUrl: "",
      columns: [], // 树形选择器数据
      // videoUrl: "", // 视频url
      listData: [], // 列表数据
      limit: 5,
      page: 1,
      fieldId: '',
      loading: "loadmore"
    };
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight;
    },
    safetyTop() {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
    safetyBottom() {
      return uni.getSystemInfoSync().safeAreaInsets.bottom;
    }
  },
  onLoad() {
    uni.hideTabBar();
  },
  onShow() {
    this.getFieldTree();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.listData = [];
    this.getList();
  },
  methods: {
    getUnhadlerNum() {
      alarmUnhandlerNumApi().then(res => {
        let total = res.data.un_handle_total || 0;
        userStore().set_alarm_num(total);
      });
    },
    getFieldTree() {
      // 获取栏位数据 并设置默认选中
      fieldTree().then(res => {
        if (res.code === 200) {
          let newTree = addTreePro(res.data[0], "checked", true);
          this.columns = [newTree];
        }
      });
    },
    treeCallback(value) {
      this.page = 1;
      this.fieldId = value.id[0];
      if (this.fieldId) {
        this.listData = [];
        this.getList();
      }
    },
    getList() {
      this.loading = "loading";
      this.getUnhadlerNum();
      videoAlarmApi({
        pen_id: this.fieldId,
        page: this.page,
        limit: this.limit
      })
        .then(res => {
          uni.stopPullDownRefresh();
          if (res.code == 200) {
            this.videoUrl = res.data.video_url;
            console.log(res.data.video_url);
            this.listData = this.listData.concat(res.data.alarm_data);
            if (this.listData.length < res.data.total) {
              this.loading = "loadmore";
            } else {
              this.loading = "nomore";
            }
          }
        })
        .catch(() => {
          this.loading = "nomore";
          uni.stopPullDownRefresh();
        });
    },
    loadmore() {
      if (this.loading == "loadmore") {
        this.page += 1;
        this.getList();
      }
    },
    upwardClick() {
      uni.navigateTo({ url: "/pages/view/components/reporting/index" });
    },
    enterDetails(id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id });
    },
    linkToVideoLive() {
      uni.navigateTo({ url: "/pages/video/index" });
    },
    handleLoad() {
      console.log("Webview loaded successfully.");
    },
    handleError(e) {
      console.log(e);
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
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .ding {
      position: absolute;
      right: 24rpx;
      top: 38rpx;
    }
    .upward {
      width: 100%;
      height: 80rpx;
      padding: 0 100rpx;
      position: fixed;
      right: 0rpx;
      bottom: 100rpx;
      display: flex;
      justify-content: center;
      align-self: center;
    }
    .video-section {
      width: 100%;
      height: 360rpx;
      background: #333333;
      display: flex;
      align-content: center;
      justify-content: center;
    }
    .warin-section {
      height: 830rpx;
      // padding-bottom: 100rpx;
      .list-item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .item-info {
          height: 160rpx;
          margin-left: 24rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          position: relative;
        }
        .tag-box {
          display: flex;
        }
      }
    }
  }
}
.image-wrapper {
  width: 280rpx;
  height: 158rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-wrapper {
  position: relative;
}

.live-icon {
  position: absolute;
  top: 16px;
  right: 16rpx;
  z-index: 10; /* 确保图标在视频之上 */
}
</style>
