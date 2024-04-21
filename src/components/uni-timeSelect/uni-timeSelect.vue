<template>
	<view class="field-select-container" @click="openTree">111</view>
  
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
      default: 'search'
    },
    prefixIcon: {
      type: String,
      default: 'list-dot'
    },
    iconColor: {
      type: String,
      default: '#10cc8f'
    }
  },
  data() {
    return {
      label: "",
      id: '',
      suffixIconStyle: {
        fontSize: '48rpx',
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
    openTree() {
      this.$refs.qiantree._show()
    },
    confirmTree(e) {
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
  height: 100%;
  padding: 24rpx 0;
}
</style>