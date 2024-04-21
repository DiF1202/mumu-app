<template>
	<view class="field-select-container" @click="openTree">
    <u--input
      v-model="label"
      :prefixIcon="prefixIcon"
      :prefixIconStyle="prefixIconStyle"
      :suffixIcon="suffixIcon"
      :suffixIconStyle="suffixIconStyle"
      placeholder="请选择栏位"
      border="false"
      shape="circle"
      color="#0F4239"
      disabledColor="#F4F4F4"
      disabled
    />
	</view>
  <uni-tree 
    ref="qiantree"
    labelKey="label"
    valueKey="id" 
    :selectParent="false"
    :multiple="false"
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