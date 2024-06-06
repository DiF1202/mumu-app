<template>
  <view class="date-select-container" @click="openCalendar">
    <u--input
      v-model="date"
      :prefixIcon="prefixIcon"
      :prefixIconStyle="prefixIconStyle"
      :suffixIcon="suffixIcon"
      :suffixIconStyle="suffixIconStyle"
      placeholder="请选择日期"
      border="false"
      shape="circle"
      color="#0F4239"
      disabledColor="#F4F4F4"
      disabled
    />
    <u-calendar :show="show" mode="range" @confirm="confirm"></u-calendar>
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
      default: '#00443A'
    }
  },
  data () {
    return {
      date: '',
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
    openCalendar () {
      this.show = true
    },
    confirm (e) {
      console.log(e)
      this.date = e[0] + '~' + e[1]
      this.$emit('dateCallback', e)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.date-select-container {
  width: 100%;
  height: 100%;
  padding-top: 24rpx;
}
</style>