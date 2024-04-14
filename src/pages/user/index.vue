<template>
  <view class="container">
    <view class="user-info">
      <!-- <image class="avatar" src="path_to_avatar_image"></image> -->
      <text class="username">用户昵称</text>
    </view>
    <view class="user-data">
      <text>个人数据</text>
    </view>
    <view class="settings">
      <button @click="navigateToSettings">设置</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    navigateToSettings() {
      // 导航到设置页面
      uni.navigateTo({
        url: "/pages/settings/settings"
      });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
.username {
  font-size: 18px;
  font-weight: bold;
}
.user-data {
  margin-top: 20px;
  font-size: 16px;
}
.settings {
  margin-top: auto;
}
button {
  background-color: #007aff;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
}
</style>
