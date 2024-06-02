<template>
  <view class="list-container">
    <uni-navtopbar title="远程查看" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
      <uni-subTitle icon="order" title="畜舍情况" value="实况视频" url="pages/video/index"/>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="manager-view">
          <u--image :showLoading="true" src="/static/icon/woman.png" width="160rpx" height="160rpx" shape="circle"></u--image>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text :text="'负责人：' + staff_name" color="#0F4239" size="24rpx" margin="12rpx"></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text :text="'动态存栏：' + animal_count" color="#0F4239" size="24rpx" margin="12rpx"></u--text>
            </view>
          </view>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text :text="'栏位占用：' + pen_occupancy_rate" color="#0F4239" size="24rpx" margin="12rpx"></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text :text="'疑死数量: ' + death_count" color="#0F4239" size="24rpx" margin="12rpx"></u--text>
            </view>
          </view>
        </view>
      </uni-card>
      <!-- <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="video-section" @click="linkToVideoLive">
          <u-icon name="play-circle-fill" size="40"></u-icon>
        </view>
      </uni-card> -->
      <u-gap height="12rpx"></u-gap>
      <view class="warin-section">
        <u-list @scrolltolower="loadmore" lowerThreshold="100" height="100%">
          <u-list-item v-for="(item, index) in listData" :key="index">
            <uni-card margin="0" padding="0" spacing="24rpx">
              <view class="list-item" @click="enterDetails(item.alarm_id)">
                <u--image :showLoading="true" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" width="280rpx" height="210rpx"></u--image>
                <view class="item-info">
                  <view>
                    <u--text :text="item.alarm_name" size="36rpx" color="#333333" :bold="true"></u--text>
                  </view>
                  <view>
                    <u--text :text="'时间：' + item.alarm_time" size="28rpx" color="#333333"></u--text>
                  </view>
                  <view class="tag-box">
                    <view style="margin-right: 12rpx;">
                      <u-tag
                        :text="item.alarm_status"
                        :type="item.alarm_status === '已处理' ? 'success' : 'error'"
                        shape="circle"
                        size="mini"
                      ></u-tag>
                    </view>
                    <view>
                      <u-tag :text="item.report_type== 1 ? 'AI生成' : '自主上报' " shape="circle" size="mini"></u-tag>
                    </view>
                  </view>
                  <!-- <view class="select-item">
                    <u-checkbox-group v-model="item.select">
                      <u-checkbox :name="item.id" label=""></u-checkbox>
                    </u-checkbox-group>
                  </view> -->
                </view>
                <view class="ding" @click.stop="openDing(item.alarm_id)">
                  <u-icon name="bell-fill" size="38rpx" color="#10cc8f"></u-icon>
                </view>
              </view>
            </uni-card>
            <u-gap height="12rpx"></u-gap>
          </u-list-item>
          <u-loadmore :status="loading" loadingIcon="semicircle" height="88rpx" fontSize="32rpx" @loadmore="loadmore" />
        </u-list>
      </view>
    </view>
    <view class="upward">
      <!-- <u-icon name="arrow-upward" size="38rpx" color="#10cc8f"></u-icon> -->
      <u-button color="#3DAD82" type="primary" shape="circle" text="自主上报"  @click="upwardClick"></u-button>
    </view>
    <u-toast ref="uToast"></u-toast>
    <u-modal :show="dingShow" @confirm="dingClick" :showCancelButton="true" @cancel="dingShow = false">
      <view class="slot-content" style="width: 100%;">
        <u--textarea v-model="dingText" border="none" autoHeight placeholder="请输入提醒消息" style="background: #F7F7F7;"></u--textarea>
      </view>
    </u-modal>
    <uni-tabbar :tabCurrent="1"></uni-tabbar>
  </view>
</template>

<script>
import { fieldTree } from "@/api/utils.js";
import { addTreePro } from "@/utils/common.js";
import { videoAlarmApi, dingApi } from "@/api/view.js";
import { userStore } from "@/store";
export default {
  data () {
    return {
      columns: [], // 树形选择器数据
      videoUrl: "", // 视频url
      listData: [], // 列表数据
      staff_name: '',
      animal_count: '',
      pen_occupancy_rate: '',
      death_count: '',
      dingShow: false,
      alarmId: '',
      dingText: '',
      fieldId: '',
      limit: 5,
      page: 1,
      loading: "loadmore"
    };
  },
  computed: {
    windowHeight () {
      return uni.getSystemInfoSync().windowHeight;
    },
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    }
  },
  onLoad () {
    uni.hideTabBar()
    this.getFieldTree()
  },
  onShow () {
    if (this.fieldId) {
      this.page = 1;
      this.listData = [];
      this.getList();
    }
  },
  methods: {
    getFieldTree () {
      // 获取栏位数据 并设置第一个子元素为默认选中
      fieldTree().then(res => {
        if (res.code === 200) {
          let newTree = addTreePro(res.data[0], 'checked', true)
          this.columns = [newTree]
        }
      })
    },
    treeCallback (value) {
      this.page = 1
      this.fieldId = value.id[0]
      if (this.fieldId) {
        this.listData = [];
        this.getList();
      }
    },
    getList () {
      this.loading = "loading";
      videoAlarmApi({
        pen_id: this.fieldId,
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code == 200) {
          this.staff_name = res.data.staff_name || ''
          this.animal_count = res.data.animal_count || ''
          this.pen_occupancy_rate = res.data.pen_occupancy_rate || ''
          this.death_count = res.data.death_count || ''
          this.videoUrl = res.data.video_url
          this.listData = this.listData.concat(res.data.alarm_data)
          userStore().set_alarm_num(5);
          if (this.listData.length < res.data.total) {
            this.loading = "loadmore"
          } else {
            this.loading = "nomore"
          }
        }
      }).catch(() => {
        this.loading = "nomore"
      })
    },
    loadmore () {
      if (this.loading == "loadmore") {
        this.page += 1
        this.getList()
      }
    },
    openDing (id) {
      this.alarmId = id
      this.dingShow = true
    },
    dingClick () {
      dingApi({ pen_id: this.fieldId, alarm_ids: [this.alarmId], text: this.dingText }).then(res => {
        if (res.code == 200) {
          this.$refs.uToast.show({ message: "提醒消息发送成功" })
          this.dingShow = false
        }
      })
    },
    upwardClick () {
      uni.navigateTo({ url: "/pages/view/components/reporting/index" })
    },
    enterDetails (id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id })
    },
    linkToVideoLive () {
      uni.navigateTo({ url: "/pages/video/index" })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .upward {
    width: 100%;
    height: 80rpx;
    padding: 0 100rpx;
    position: fixed;
    right: 0rpx;
    bottom: 180rpx;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    padding: 0 24rpx 24rpx;
    .dot {
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      background-color: #10cc8f;
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
      height: 850rpx;
      padding-bottom: 100rpx;
      .list-item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .item-info {
          height: 210rpx;
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
</style>
