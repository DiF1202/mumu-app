<template>
	<view class="container">
		<view class="section">
			<view class="section-title">处置信息</view>
			<view class="form-view">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm" label-width="auto">
					<u-form-item label="处置方式" prop="disposer" required>
						<u-radio-group v-model="form.disposer" style="justifyContent:flex-end" @change="changeRadio">
							<u-radio v-for="(item, index) in isReal" :key="index" :label="item.name" :name="item.value" size="30rpx" :customStyle="{marginLeft: '16rpx',fontSize:'16rpx'}">
							</u-radio>
						</u-radio-group>
					</u-form-item>
        </u--form>
				<view class="form-btn">
					<u-button type="primary" text="提交" @click="submit"></u-button>
				</view>
			</view>
    </view>
    <view class="section">
        <view class="section-title">报警信息</view>
        <uni-cellItem title="事件名称:" value="濒死报警"></uni-cellItem>
        <uni-cellItem title="时间:" value="2022-22-22 22:22:00"></uni-cellItem>
        <uni-cellItem title="地点:" value="一厂/二栏/三舍"></uni-cellItem>
        <uni-cellItem title="状态:" value="未处理"></uni-cellItem>
      </view> 
      <u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				form: {
					disposer: '',
				},
				rules: {
					disposer: [{ type: 'string', required: true, message: '请选择处置方式', trigger: ['change'] }]
				},
        isReal: [
          { name: '误报', value: '1'},
          { name: '处理', value: '2'}
        ]
			}
		},
		onLoad() {
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					console.log(this.form)
          this.$refs.uToast.show({message: '操作成功', complete() {
            uni.navigateBack()
          }})
				})
			},
      changeRadio(e) {
        console.log(e)
      }
		}
	}
</script>

<style lang="scss" scoped>
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
			border-left: 6rpx solid #2681FF;
			padding-left: 26rpx;
      font-weight: bold;
		}
		.form-view {
			padding: 20rpx 0rpx 0 10rpx;
			.form-btn {
				padding-top: 20rpx;
			}
		}
	}
</style>