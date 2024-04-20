import { createSSRApp } from "vue";
import App from "./App.vue";
// 导入uview组件库
import uviewPlus from 'uview-plus';
// 导入pinia 实例
import pinia from './store'
export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus);
	app.use(pinia)
	return {
		app,
	}
}
