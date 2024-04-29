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
      <!-- 报警处置 角色为守卫的时候展 并且 数据为未处置的 展示 -->
      <view v-if="user_role === '2'">
        <uni-subTitle icon="file-text" title="告警处置" />
        <view class="warning-handler">
          <u--form labelPosition="left" :model="form" :rules="rules" ref="uForm" label-width="auto">
            <u-form-item label="处置方式" prop="disposer" required>
              <u-radio-group v-model="form.disposer" :style="{ justifycontent: 'flex-end' }" @change="changeRadio">
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
      <view v-else>
        <!-- 报警指派 角色未管家的时候展示 -->
        <uni-subTitle icon="pushpin" title="告警指派" />
        <uni-treeSelect placeholder="请选择员工" prefixIcon="account" :columns="columns" @treeCallback="treeCallback" />
        <view class="form-btn">
          <u-button type="primary" plain shape="circle" text="指派" @click="submit"></u-button>
        </view>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { userStore } from '@/store'
import Player from "mui-player";
import "mui-player/dist/mui-player.min.css";
// import Flv from "flv.js";

export default {
  data() {
    return {
      form: {
        disposer: ""
      },
      rules: {
        disposer: [
          {
            type: "string",
            required: true,
            message: "请选择处置方式",
            trigger: ["change"]
          }
        ]
      },
      isReal: [
        { name: "误报", value: "1" },
        { name: "已处理", value: "2" }
      ],
      columns: [
        {
          id: 2,
          label: '一厂',
          children: [
            {id: 21, label: '张三'},
            {id: 22, label: '李四'}
          ]
        }
      ]
    }
  },
  computed: {
    user_role() {
      return userStore().user_role
    }
  },
  onReady() {
    // this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.uForm.validate().then(res => {
        console.log(this.form);
        this.$refs.uToast.show({
          message: "操作成功",
          complete() {
            uni.navigateBack();
          }
        });
      });
    },
    changeRadio(e) {
      console.log(e);
    },
    treeCallback(value) {
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
