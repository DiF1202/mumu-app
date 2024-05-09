<template>
  <view class="details-container">
    <uni-navtopbar title="告警详情" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="play-right" title="告警回看" />
      <view class="video-section">
        <view id="mui-player"></view>
      </view>
      <uni-subTitle icon="file-text" title="告警信息" />
      <view class="warning-info">
        <u--text :text="'事件名称: 濒死告警'" size="30rpx" color="#333333" margin="12rpx"></u--text>
        <u--text :text="'时间: 2022-22-22 22:22:00'" size="30rpx" color="#333333" margin="12rpx"></u--text>
        <u--text :text="'地点: 一厂/二栏/三舍'" size="30rpx" color="#333333" margin="12rpx"></u--text>
        <u--text :text="'状态: 未处理'" size="30rpx" color="#333333" margin="12rpx"></u--text>
      </view>
      <!-- 报警处置 数据为未处置的 展示 -->
      <view>
        <uni-subTitle icon="file-text" title="告警处置" />
        <view class="warning-handler">
          <u--form labelPosition="left" :model="form" ref="uForm" label-width="auto">
            <u-form-item label="处置方式" prop="disposer" required>
              <u-radio-group v-model="form.disposer">
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
          <u-button type="primary" plain shape="circle" text="提交" @click="submit"></u-button>
        </view>
      </view>
      <!-- 指派功能 -->
      <!-- <view>
        <uni-subTitle icon="pushpin" title="告警指派" />
        <uni-treeSelect placeholder="请选择员工" prefixIcon="account" :columns="columns" @treeCallback="treeCallback" />
        <view class="form-btn">
          <u-button type="primary" plain shape="circle" text="指派" @click="submit"></u-button>
        </view>
      </view> -->
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { userStore } from '@/store'
import { alarmDetailApi, alarmHandlerApi } from '@/api/view.js'
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      form: {
        disposer: "1"
      },
      // rules: {
      //   disposer: [
      //     {
      //       type: "string",
      //       required: true,
      //       message: "请选择处置方式",
      //       trigger: ["change"]
      //     }
      //   ]
      // },
      isReal: [
        { name: "解除报警", value: "1" },
        { name: "无法处理", value: "2" }
      ],
      alarmId: '',
      columns: [
        {
          id: 2,
          name: '一厂',
          children: [
            {id: 21, name: '张三'},
            {id: 22, name: '李四'}
          ]
        }
      ]
    }
  },
  computed: {
    user_role() {
      return userStore().user_info.identity_type
    }
  },
  onLoad(options) {
    this.alarmId = options.id
    this.getDetail()
  },
  // onReady() {
  //   if (this.user_role === 1) {
  //     this.$refs.uForm.setRules(this.rules);
  //   }
  // },
  methods: {
    // 获取报警详情
    getDetail() {
      alarmDetailApi({alarm_id: this.alarmId}).then(res => {
        console.log(res)
      })
    },
    submit() {
      console.log(this.form);
      alarmHandlerApi({alarm_id: this.alarmId, type: this.form.disposer}).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$refs.uToast.show({
            message: "操作成功",
            complete() {
              uni.navigateBack();
            }
          });
        }
      })
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
        //     cors: true
        //   }
        // }
      });
    }
  },
  mounted() {
    // this.initPlayer();
  }
};
</script>

<style lang="scss" scoped>
.details-container {
  .content {
    background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
    padding: 0 24rpx 48rpx;
    .video-section {
      width: 100%;
      height: 400rpx;
      background: #333333;
      margin-top: 24rpx;
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
      margin-top: 24rpx;
    }
  }
}
</style>
