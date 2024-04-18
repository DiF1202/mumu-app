<template>
	<view class="list-container">
		<view class="search-view">
			<view  class="search-input">
				<u--input v-model="searchValue" border="false" placeholder="请输入内容" prefixIcon="search" />
			</view>
			<u-icon :name="filterPanel?'arrow-up-fill':'arrow-down-fill'" color="#666666" size="28rpx" label="筛选" labelPos="left" labelSize="32rpx" labelColor="#666666" @click="filterPanel=!filterPanel"></u-icon>
			<view v-if="filterPanel" class="filter-panel" :style="{height: `${windowHeight - 42}px`}">
				<view class="filter-panel-content">
					<view class="filter-title">厂</view>
					<view class="state-list">
						<view v-for="item in oneLevel" :key="item.id" class="state-item">{{item.label}}</view>
					</view>
					<view class="filter-title">栏位</view>
					<view class="state-list">
						<view v-for="item in twoLevel" :key="item.id" class="state-item">{{item.label}}</view>
					</view>
					<view class="filter-title">圈舍</view>
					<view class="state-list">
						<view v-for="item in threeLevel" :key="item.id" class="state-item" :class="status==item.id ? 'active' : ''" @click="selectStatus(item)">{{ item.label }}</view>
					</view>
					<view class="btn-box">
						<u-button text="重置" style="marginRight:20rpx"></u-button>
						<u-button type="primary" text="确定"></u-button>
					</view>
				</view>
			</view>
		</view>
		<u-list @scrolltolower="loadmore" lowerThreshold="100" :height="windowHeight - listHeight">
			<u-list-item v-for="(item, index) in listData" :key="index">
				<view class="list-item">
					<view class="item-header">
						<u--text suffixIcon="arrow-right" iconStyle="font-size: 18px; color: #333333; font-weight:bold" :text="item.title" size="36rpx" color="#333333" :bold="true"></u--text>
						<view class="status">
							<view class="status-item">未处理</view>
						</view>
					</view>
					<view class="item-row">
						<text class="row-label">位置：</text>
						<text class="row-value">{{ item.build }}</text>
					</view>
					<view class="item-row">
						<text class="row-label">时间：</text>
						<text class="row-value">{{ item.time }}</text>
					</view>
				</view>
			</u-list-item>
			<u-loadmore :status="laoding" loadingIcon="semicircle" height="88" fontSize="32rpx" @loadmore="loadmore"/>
		</u-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				filterPanel: false,
				listData: [
					{ title: '濒死告警', status: '1', build: '一厂/2栏/3圈', time: '2022-12-12 12:12'},
					{ title: '死亡告警', status: '1', build: '一厂/2栏/3圈',  time: '2022-12-12 12:12'},
					{ title: '环境异常', status: '1',  build: '一厂/2栏/3圈',  time: '2022-12-12 12:12'},
					{ title: '濒死告警', status: '1', build: '一厂/2栏/3圈', time: '2022-12-12 12:12'},
					{ title: '死亡告警', status: '1', build: '一厂/2栏/3圈',  time: '2022-12-12 12:12'},
					{ title: '环境异常', status: '1',  build: '一厂/2栏/3圈',  time: '2022-12-12 12:12'}
				],
				pageNum: 1,
				laoding: 'loadmore',
				oneLevel: [{label: '全部', id: '0'}, {label: '一厂', id: 1}, {label: '二厂', id: 2}, {label: '三厂', id: 3}, {label: '四厂', id: 4}],
				twoLevel: [{label: '全部', id: '0'}, {label: '一栏', id: 1}, {label: '二栏', id: 2}, {label: '三栏', id: 3}, {label: '四栏', id: 4}],
				threeLevel: [{label: '全部', id: '0'}, {label: '一圈', id: 1}, {label: '二圈', id: 2}],
				status: '',
				state: ''
			}
		},
		computed: {
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight
			},
      listHeight() {
				let safe = uni.getSystemInfoSync().safeAreaInsets
        return safe.top + safe.bottom
      }
		},
		methods: {
			loadmore() {
				this.pageNum += 1
				if (this.laoding == 'loadmore') {
					this.getList()
				}
			},
			getList() {
				this.laoding = 'loading'
				setTimeout(() => {
					for(let i = 0; i < 3; i++) {
						console.log(i)
						this.listData.push({ title: '环境异常', status: '1',  build: '一厂/2栏/3圈',  time: '2022-12-12 12:12'})
					}
					this.laoding= 'loadmore'
				}, 2000)
			},
			selectStatus(item) {
				this.status = item.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-view {
		padding: 12rpx 24rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		.search-input {
			width: 80%;
			background: #F5F5F5;
			color: #333333;
		}
		.filter-panel {
			width: 100%;
			position: absolute;
			left: 0;
			top: 96rpx;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 100;
			.filter-panel-content {
				background-color: #ffff;
				padding: 0 30rpx 30rpx;
				.filter-title {
					color: #000000;
					font-size: 30rpx;
					font-weight: 500;
					padding: 30rpx 0;
				}
				.state-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.state-item {
						width: 210rpx;
						height: 72rpx;
						border: 1rpx solid rgba(0, 0, 0, 0.25);
						border-radius: 72rpx;
						text-align: center;
						line-height: 72rpx;
						margin: 0 20rpx 20rpx 0;
						font-size: 28rpx;
						color: #000000;
					}
					.active {
						background-color: rgba(222, 241, 255, 1);
						border: 1rpx solid rgba(22, 119, 255, 1);
					}
				}
			}
			.btn-box {
				display: flex;
				padding: 24rpx 30rpx;
				background-color: #fff;
				box-shadow: 0rpx -10rpx 20rpx #EEEEEE;
			}
		}

	}
	.list-item {
		padding: 24rpx;
		margin: 24rpx;
		border-radius: 16rpx;
		background-color: #fff;
		.item-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 16rpx;
			.status {
				.status-item {
					width: 120rpx;
					height: 44rpx;
					text-align: center;
					line-height: 44rpx;
					border-radius: 4rpx;
					color: rgba(255, 85, 51, 1);
					background-color: rgba(255, 85, 51, 0.2);
					font-size: 24rpx;
				}
			}
		}
		.item-row {
			padding: 16rpx 0;
			.row-label {
				color: rgba(0, 0, 0, 0.55);
			}
			.row-value {
				color: rgba(0, 0, 0, 0.85)
			}
		}
	}
</style>
