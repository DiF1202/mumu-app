<template>
	<view class="uploading">
		<u-upload
			:fileList="fileList"
			:multiple="false"
			:maxCount="1"
			:previewFullImage="true"
			width="200rpx"
			height="200rpx"
			@afterRead="afterRead"
			@delete="deletePic"
		>
		</u-upload>
	</view>
</template>

<script>
	import { uploadAPI } from '@/api/utils.js'
	export default {
		data() {
			return {
				fileList: []
			}
		},
		methods: {
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			async afterRead(event) {
				console.log(event, 'event')
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {this.fileList.push({...item, status: 'uploading',message: '上传中'})})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, { status: 'success', message: '', url: result}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uploadAPI({name: 'file', filePath: url}).then(res => {
						console.log(res)
						if (res.data.url) {
							resolve(res.data.url)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.uploading {
  padding-top: 24rpx;
}
</style>