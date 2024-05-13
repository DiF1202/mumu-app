<template>
  <web-view
    src="https://m.zzxmt.cn/html/player.html"
    :style="{ width: '100%', height: '100%' }"
  ></web-view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false
    }
  }
};
</script>
