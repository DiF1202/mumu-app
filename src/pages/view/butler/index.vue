<template>
  <view class="list-container">
    <uni-navtopbar title="远程监控" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
      <!-- <uni-subTitle
        icon="order"
        title="畜舍情况"
        value="实况视频"
        url="pages/video/index"
      /> -->
      <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="manager-view">
          <u--image
            :showLoading="true"
            :src="avatar"
            width="160rpx"
            height="160rpx"
            shape="circle"
          ></u--image>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'负责人：' + staff_name"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'动态存栏：' + animal_count"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
          </view>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'体弱数量：' + pen_occupancy_rate"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'疑死数量: ' + death_count"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
          </view>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <uni-card v-if="this.video_url" margin="0" padding="0" spacing="24rpx">
        <view class="video-wrapper">
          <video
            v-if="this.video_url"
            id="myVideo"
            :src="this.video_url"
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
                <view class="ding" @click.stop="openDing(item.alarm_id)">
                  <u-icon
                    name="bell-fill"
                    size="38rpx"
                    color="#00443A"
                  ></u-icon>
                </view>
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
    </view>
    <view class="upward" :style="{ bottom: safetyBottom + 62 + 'px' }">
      <!-- <u-icon name="arrow-upward" size="38rpx" color="#00443A"></u-icon> -->
      <u-button
        color="#10cc8F"
        type="primary"
        shape="circle"
        text="自主反馈"
        @click="upwardClick"
      ></u-button>
    </view>
    <u-toast ref="uToast"></u-toast>
    <u-modal
      :show="dingShow"
      @confirm="dingClick"
      :showCancelButton="true"
      @cancel="dingShow = false"
      @close="dingShow = false"
      :closeOnClickOverlay="true"
    >
      <view class="slot-content" style="width: 100%">
        <u--textarea
          v-model="dingText"
          border="none"
          autoHeight
          placeholder="请输入提醒消息"
          style="background: #f7f7f7"
        ></u--textarea>
      </view>
    </u-modal>
    <uni-tabbar :tabCurrent="1"></uni-tabbar>
  </view>
</template>

<script>
import { fieldTree, alarmUnhandlerNumApi } from "@/api/utils.js";
import { addTreePro } from "@/utils/common.js";
import { videoAlarmApi, dingApi } from "@/api/view.js";
import { userStore } from "@/store";
export default {
  data () {
    return {
      videolurl:
        "https://mps01.ivm.myhuaweicloud.com:7081/live/live.m3u8?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbSI6IkdCMjgxODEiLCJjIjowLCJjaGFubmVsX2lkIjoiOTk0NTI2MzUwNTEzMTA5OTExNjYiLCJkZXZpY2VfaWQiOiI5OTQ1MjYzNTA1MTE4MDAwMDAwMyIsImV4dG1jIjoxNzE4MjcwNzU1LCJpcCI6Im1wczAxLml2bS5teWh1YXdlaWNsb3VkLmNvbSIsImxrIjoiMTcxODIxMzE1NTI2NTQxNzM2MjJkYmM1YjMwIiwicmVxdWVzdF9pZCI6ImQzMmRlZjgxLTI4ZTAtMTFlZi05YmRjLTAyNTUwYTAwMDMxZSIsInN0IjowLCJ0cCI6MCwidXNlcl9pZCI6IjYxOTIxMTE1OTIwMjQwNTEwMTMzNzA3IiwidXQiOiJFTlRFUlBSSVNFIn0.A-b8JDm5ngpelqVlptdPEYUp1x3IouQezgGI3JIuSIc&device_id=99452635051180000003&channel_id=99452635051310991166&stream_type=0",
      columns: [], // 树形选择器数据
      videoUrl: "", // 视频url
      listData: [], // 列表数据
      staff_name: "",
      video_url: "",
      animal_count: "",
      pen_occupancy_rate: "",
      death_count: "",
      dingShow: false,
      alarmId: "",
      dingText: "",
      fieldId: "",
      limit: 5,
      page: 1,
      loading: "loadmore",
      avatar: "https://m.zzxmt.cn/cdn/icon/woman.png"
    };
  },
  computed: {
    windowHeight () {
      return uni.getSystemInfoSync().windowHeight;
    },
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
    safetyBottom () {
      return uni.getSystemInfoSync().safeAreaInsets.bottom;
    }
  },
  onLoad () {
    uni.hideTabBar();
  },
  onShow () {
    this.getFieldTree();
  },
  onPullDownRefresh () {
    this.page = 1;
    this.listData = [];
    this.getList();
  },
  methods: {
    getUnhadlerNum () {
      alarmUnhandlerNumApi().then(res => {
        let total = res.data.un_handle_total || 0;
        userStore().set_alarm_num(total);
      });
    },
    getFieldTree () {
      // 获取栏位数据 并设置第一个子元素为默认选中
      fieldTree().then(res => {
        if (res.code === 200) {
          let newTree = addTreePro(res.data[0], "checked", true);
          this.columns = [newTree];
        }
      });
    },
    treeCallback (value) {
      this.page = 1;
      this.fieldId = value.id[0];
      if (this.fieldId) {
        this.listData = [];
        this.getList();
      }
    },
    getList () {
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
            this.staff_name = res.data.staff_name || "";
            this.animal_count = res.data.animal_count || "";
            this.pen_occupancy_rate = res.data.pen_occupancy_rate || "";
            this.death_count = res.data.death_count || "";
            this.video_url = res.data.video_url;
            this.avatar =
              res.data.avatar || "https://m.zzxmt.cn/cdn/icon/woman.png";
            this.listData = this.listData.concat(res.data.alarm_data);
            if (this.listData.length < res.data.total) {
              this.loading = "loadmore";
            } else {
              this.loading = "nomore";
            }
          }
        })
        .catch(() => {
          uni.stopPullDownRefresh();
          this.loading = "nomore";
        });
    },
    loadmore () {
      if (this.loading == "loadmore") {
        this.page += 1;
        this.getList();
      }
    },
    openDing (id) {
      this.alarmId = id;
      this.dingShow = true;
    },
    dingClick () {
      dingApi({
        pen_id: this.fieldId,
        alarm_ids: [this.alarmId],
        text: this.dingText
      }).then(res => {
        if (res.code == 200) {
          this.$refs.uToast.show({ message: "提醒消息发送成功" });
          this.dingShow = false;
        }
      });
    },
    upwardClick () {
      uni.navigateTo({ url: "/pages/view/components/reporting/index" });
    },
    enterDetails (id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id });
    },
    linkToVideoLive () {
      uni.navigateTo({ url: "/pages/video/index" });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  .upward {
    width: 100%;
    height: 80rpx;
    padding: 0 100rpx;
    position: fixed;
    right: 0rpx;
    bottom: 195rpx;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .dot {
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      background-color: #00443a;
      margin: 22rpx 0;
    }
    .manager-view {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .fields-chart {
        height: 160rpx;
      }
      .manager-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .info-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
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
      }
      .tag-box {
        display: flex;
      }
      .ding {
        position: absolute;
        right: 0rpx;
        top: 0rpx;
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
  object-fit: cover; /* or use object-fit: contain; to include the whole image */
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
