<template>
  <view class="date-select-container" @click="open">
    <u--input
      v-model="value"
      :prefixIcon="prefixIcon"
      :prefixIconStyle="prefixIconStyle"
      :suffixIcon="suffixIcon"
      :suffixIconStyle="suffixIconStyle"
      placeholder="请选择"
      shape="circle"
      color="#0F4239"
      disabledColor="#F4F4F4"
      disabled
      customStyle="border-color:#cccccc"
    />
  </view>
  <!-- 真机无滚动穿透问题，模拟器有 -->
  <u-picker
    :show="show"
    :columns="columns"
    keyName="name"
    @confirm="confirm"
    @close="close"
    @cancel="show = false"
    :closeOnClickOverlay="true"
    :defaultIndex="[0]"
  ></u-picker>
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
    },
    columns: {
      type: Array,
      default: []
    }
  },
  data () {
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
  watch: {
    columns: {
      handler (val) {
        console.log(3333333333333)
        if (val) {
          this.value = val[0][0].name
        }
      }
    }
  },
  methods: {
    open () {
      console.log(1111111111)
      this.show = true
    },
    close () {
      console.log(222222222)
      this.show = false
    },
    confirm (e) {
      this.value = e.value[0].name
      this.show = false
      this.$emit('pickerCallback', e.value[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.date-select-container {
  width: 100%;
  height: 100%;
  padding-top: 24rpx;
  z-index: 10000;
}
</style>