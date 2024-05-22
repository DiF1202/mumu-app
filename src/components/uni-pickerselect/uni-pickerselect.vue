<template>
	<view class="date-select-container" @click="open" @touchmove.stop.prevent="() => {}">
    <u--input
      v-model="value"
      :prefixIcon="prefixIcon"
      :prefixIconStyle="prefixIconStyle"
      :suffixIcon="suffixIcon"
      :suffixIconStyle="suffixIconStyle"
      placeholder="请选择"
      border="false"
      shape="circle"
      color="#0F4239"
      disabledColor="#F4F4F4"
      disabled
    />
    <!-- 真机无滚动穿透问题，模拟器有 -->
    <u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" @cancel="show=false"></u-picker>
	</view>
</template>

<script>
export default {
  props: {
    prefixIcon: {
      type: String,
      default: 'calendar'
    },
    suffixIcon: {
      type: String,
      default: 'arrow-down'
    },
    iconColor: {
      type: String,
      default: '#10cc8f'
    },
    columns: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      value: '',
      show: false,
      suffixIconStyle: {
        fontSize: '38rpx',
        fontWeight: 'bold',
        color: this.iconColor
      },
      prefixIconStyle: {
        fontSize: '48rpx',
        fongWeight: 'bold',
        color: this.iconColor
      }
    }
  },
  methods: {
    open() {
      this.show = true
    },
    confirm(e) {
      this.value = e.value[0].name
      this.show = false
      this.$emit('pickerCallback', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.date-select-container {
  width: 100%;
  height: 100%;
  padding: 24rpx 0;
  z-index: 10000;
}
</style>