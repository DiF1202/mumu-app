<template>
  <view :style="{margin: '12rpx 0'}">
    <u-cell :border="true" :isLink="url?true:false" :url="url" :rightIconStyle="rightIconStyle" :clickable="false">
      <template #title>
        <u--text 
          :text="title"
          :bold="true"
          align="left"
          color="#333333"
          size="34rpx"
          lines="1"
        ></u--text>
      </template>
      <template #value>
        <u--text 
          :text="value"
          :bold="true"
          align="right"
          color="#333333"
          size="34rpx"
        ></u--text>
      </template>
      <!-- 如果uView icon 不满足需求 后续添加 #icon插槽使用 iconfont -->
      <template #icon>
        <u-icon v-if="icon" :name="icon" :color="leftIconColor" size="46rpx"></u-icon>
        <u-icon v-else :custom-prefix="`custom-icon custom-icon-${customIcon}`" size="46rpx" :color="leftIconColor"></u-icon>
      </template>
    </u-cell>
  </view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
      value: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      leftIconColor: {
        type: String,
        default: '#10cc8f'
      },
      customIcon: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
		},
    data() {
      return {
        rightIconStyle: {
          color: '#333333',
          fontSize: '34rpx',
          fontWeight: 'bold'
        }
      }
    },
    methods() {
      
    }
	}
</script>

<style lang="scss">
</style>