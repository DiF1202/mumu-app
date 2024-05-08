<template>
  <view class="details-container">
    <uni-navtopbar title="自主上报" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="file-text" title="上报异常" />
      <view class="reporting-handler">
        <u--form labelPosition="left" :model="form" :rules="rules" ref="uForm" label-width="auto">
          <u-form-item label="报警位置" prop="pen_id" borderBottom required @click="openFiledTree">
            <u--text :text="pen_name || '请选择栏位'" align="right" :color="pen_name? '#606266': '#c0c4cc'" size="30rpx"></u--text>
            <!-- <u--input v-model="pen_name" placeholder="请选择栏位"  border="none" inputAlign="right" disabledColor="tranparent" disabled></u--input> -->
            <template #right>
              <u-icon name="arrow-right" size="30rpx" color="#333333"></u-icon>
           </template>
          </u-form-item>
          <u-form-item label="处置方式" prop="abnormal_type_id" required>
            <u-radio-group v-model="form.abnormal_type_id">
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
          <u-form-item label="上报内容" prop="report_content" borderBottom required labelPosition="top">
            <u--textarea v-model="form.report_content" placeholder="请输入上报内容"  border="none" inputAlign="right" :autoHeight="true" customStyle="background:transparent;marginTop:24rpx;color:#333333"></u--textarea>
          </u-form-item>
        </u--form>
      </view>
      <view class="form-btn">
        <u-button type="primary" plain shape="circle" text="提交" @click="submit"></u-button>
      </view>
    </view>
    <uni-tree ref="qiantree" labelKey="name" valueKey="id" :treeData="columns"  @confirm="confirmTree" ></uni-tree>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { reportAlarmApi } from '@/api/view.js'
import { fieldTree } from '@/api/utils.js'
export default {
  data() {
    return {
      form: {
        pen_id: ""
      },
      pen_name: '',
      rules: {
        pen_id: [{ type: "string", required: true, message: "请选择栏位", trigger: ["change"] }],
        report_content: [{ type: "string", required: true, message: "请输入上报内容", trigger: ["blur"] }],
        abnormal_type_id: [{ type: "string", required: true, message: "请选择类型", trigger: ["change"] }],
      },
      columns: [],
      isReal: [
        { name: "解除报警", value: "1" },
        { name: "无法处理", value: "2" }
      ],
    }
  },
  onLoad() {
    this.getFieldTree()
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    submit() {
      console.log(this.form)
    },
    getFieldTree() {
      fieldTree().then(res => {
        if (res.code === 200) {
          this.columns = res.data
        }
      })
    },
    openFiledTree() {
      this.$refs.qiantree._show()
    },
    confirmTree(e) {
      this.form.pen_id = e.id[0]
      this.pen_name = e.name[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  .content {
    background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
    padding: 0 24rpx 48rpx;
    .reporting-handler {
      padding-left: 24rpx;
    }
    .form-btn {
      margin-top: 24rpx;
    }
  }
}
</style>
