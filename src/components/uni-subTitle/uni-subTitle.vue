<template>
	<u-cell :icon="icon" :iconStyle="iconStyle" :border="true" :isLink="url?true:false" :url="url" :rightIconStyle="rightIconStyle">
		<template #title>
			<u--text 
        :text="title"
        :bold="true"
        align="left"
        color="#333333"
        size="34rpx"
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
	</u-cell>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
      url: {
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
      value: {
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
        },
        iconStyle: {
          color: this.leftIconColor,
          fontSize: '46rpx'
        }
      }
    }
	}
</script>

<style lang="scss">
</style>