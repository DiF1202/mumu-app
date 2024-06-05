<template>
  <view class="field-select-container" @click="openTree">
    <u--input
      v-model="label"
      :prefixIcon="prefixIcon"
      :prefixIconStyle="prefixIconStyle"
      :suffixIcon="suffixIcon"
      :suffixIconStyle="suffixIconStyle"
      :placeholder="placeholder"
      shape="circle"
      color="#333333"
      disabledColor="#F4F4F4"
      disabled
      customStyle="border-color:#cccccc"
    />
  </view>
  <uni-tree
    ref="qiantree"
    labelKey="name"
    valueKey="id"
    :treeData="columns"
    @confirm="confirmTree"
  ></uni-tree>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => {
        []
      }
    },
    suffixIcon: {
      type: String,
      default: 'arrow-down'
    },
    prefixIcon: {
      type: String,
      default: 'list-dot'
    },
    iconColor: {
      type: String,
      default: '#10cc8f'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      label: "",
      id: '',
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
    openTree () {
      this.$refs.qiantree._show()
    },
    confirmTree (e) {
      this.id = e.id[0]
      this.label = e.name[0]
      this.$emit('treeCallback', e)
    },
  }
}
</script>

<style lang="scss" scoped>
.field-select-container {
  width: 100%;
  padding-top: 24rpx;
}
</style>