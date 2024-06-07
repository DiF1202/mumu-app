<template>
  <view class="details-container">
    <uni-navtopbar title="告警详情" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="play-right" title="告警回看" />
      <view class="video-section">
        <video
          id="myVideo"
          :src="detailsData.video_url"
          autoplay
          controls
          class="video-play"
        ></video>
      </view>
      <uni-subTitle icon="file-text" title="告警信息" />
      <view class="warning-info">
        <u--text
          :text="'事件名称：' + detailsData.alarm_name"
          size="30rpx"
          color="#333333"
          margin="12rpx"
        ></u--text>
        <u--text
          :text="'时间：' + detailsData.alarm_time"
          size="30rpx"
          color="#333333"
          margin="12rpx"
        ></u--text>
        <u--text
          :text="'地点：' + detailsData.location"
          size="30rpx"
          color="#333333"
          margin="12rpx"
        ></u--text>
        <u--text
          :text="'状态：' + detailsData.alarm_status"
          size="30rpx"
          color="#333333"
          margin="12rpx"
        ></u--text>
      </view>
      <!-- 报警处置 数据为未处置的 和 角色判断指定 展示 -->
      <view v-if="detailsData.alarm_status == '未处理'">
        <uni-subTitle icon="file-text" title="告警处置" />
        <view class="warning-handler">
          <u--form
            labelPosition="left"
            :model="form"
            ref="uForm"
            label-width="auto"
          >
            <u-form-item label="处置方式" prop="disposer" required>
              <u-radio-group v-model="form.disposer" :labelDisabled="false">
                <u-radio
                  v-for="(item, index) in isReal"
                  :key="index"
                  :label="item.name"
                  :name="item.value"
                  size="30rpx"
                  :customStyle="{ marginLeft: '16rpx', fontSize: '16rpx' }"
                >
                </u-radio>
              </u-radio-group>
            </u-form-item>
          </u--form>
        </view>
        <view class="form-btn">
          <u-button
            type="primary"
            plain
            shape="circle"
            text="提交"
            @click="submit"
          ></u-button>
        </view>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { userStore } from '@/store'
import { alarmDetailApi, alarmHandlerApi } from '@/api/view.js'

export default {
  data () {
    return {
      alarmId: '',
      detailsData: {
        alarm_name: '',
        alarm_time: '',
        location: '',
        alarm_status: ''
      },
      form: {
        disposer: "1"
      },
      isReal: [
        { name: "解除报警", value: "1" },
        { name: "无法处理", value: "2" }
      ]
    }
  },
  computed: {
    user_role () {
      return userStore().user_info.identity_type
    }
  },
  onLoad (options) {
    this.alarmId = options.id
    this.getDetail()
  },
  methods: {
    // 获取报警详情
    getDetail () {
      alarmDetailApi({ alarm_id: this.alarmId }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailsData = res.data
        } else {
          this.$refs.uToast.show({ message: res.msg })
        }
      })
    },
    submit () {
      alarmHandlerApi({ alarm_id: this.alarmId, type: this.form.disposer }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$refs.uToast.show({
            message: "操作成功",
            complete () {
              uni.navigateBack();
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  .content {
    // background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 48rpx;
    .video-section {
      width: 100%;
      height: 400rpx;
      background: #333333;
      margin-top: 24rpx;
      .video-play {
        width: 100%;
        height: 100%;
      }
    }
    .warning-info {
      // background: #deebff;
      box-shadow: 0px 0px 10px #deebff;
      padding: 12rpx;
      margin-top: 24rpx;
      border-radius: 16rpx;
    }
    .warning-handler {
      padding-left: 24rpx;
    }
    .form-btn {
      height: 80rpx;
      margin-top: 24rpx;
    }
  }
}
</style>
