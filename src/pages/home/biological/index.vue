<template>
	<view class="biological-container">
    <uni-navtopbar title="生物资产概况" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-fieldsselect :columns="columns" @treeCallback="treeCallback" iconColor='#A2EF4D'/>
        </view>
        <view class="filter-date">
          <uni-timeSelect></uni-timeSelect>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        fieldId: '',
        columns: [
          {
            id: 2,
            label: '牧场2',
            children: [
              {id: 21, label: '厂1', children: [{id:1, label: '栏1'}]},
              {id: 22, label: '厂2'}
            ]
          }
        ]
      }
		},
    methods: {
      treeCallback(value) {
        this.fieldId = value.id[0]
      }
    }
	}
</script>

<style lang="scss" scoped>
	.biological-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 24rpx;
      .header-filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .filter-fileds {
          width: 50%;
        }
      }
    }
	}
</style>