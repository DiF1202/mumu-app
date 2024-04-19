<template>
	<u-cell :border="false">
		<template #title>
      <view class="title">{{ title }}</view>
		</template>
		<template #value >
      <view class="value" :style="valueStyle">{{ value }}</view>
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
			value: {
				type: String,
				default: ''
			},
			valueStyle: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		min-width: 220rpx;
		color: rgba(0, 0, 0, 0.55);
	}
	.value {
		color: rgba(0, 0, 0, 0.85);
	}
</style>