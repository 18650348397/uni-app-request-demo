<template>
	<view>
		<!-- 微信和支付宝小程序头部导航栏 -->
		<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
		<view class="wx-head-mod" :style="{height:navHeight + 10 + 'rpx',backgroundColor:navBackgroundColor}">
			<view class="wx-head-mod-nav" :style="{height:navigationBarHeight+'rpx',top:statusBarHeight+'rpx'}">
				<view class="wx-head-mod-nav-content" style="text-align: center;"
					:style="{height:customHeight+'rpx',justifyContent:textAlign === 'center'?'center':'left'}">
					<!-- 文本区 -->
					<view class="wx-head-mod-nav-content-mian"
						:style="{width:navTextWidth,lineHeight:customHeight + 'rpx',paddingLeft:textPaddingLeft*scaleFactor+'rpx',fontSize:fontSize*scaleFactor+'rpx',fontWeight:fontWeight,color:titleColor}">
						{{textContent}}
					</view>
					<!-- 左侧图标按钮 -->
					<view class="wx-head-mod-nav-content-back wx-head-mod-nav-content-back-zfb" :style="{display:isBackShow?'flex':'none'}"
						@tap="backEvent">
						<view class="wx-head-mod-nav-content-back-img" style="width: 100%;height: 100%;">
							<image :src="backImageUrl" mode="aspectFit" style="width: 100%;height: 100%;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<!-- 除微信和支付宝小程序之外的其他设备 -->
		<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
		<view class="other-head-mod"
			:style="{height:navHeightValue*scaleFactor+statusBarHeight+'rpx',backgroundColor:navBackgroundColor}">
			<view class="other-head-mod-mian"
				:style="{height:navHeightValue*scaleFactor+'rpx',justifyContent:textAlign === 'center'?'center':'left'}">
				<!-- 返回按钮 -->
				<view class="other-head-mod-mian-back" v-show="isBackShow" @tap="backEvent">
					<view class="other-head-mod-mian-back-img"
						:style="{width:backImageWidth*scaleFactor+'rpx',height:backImageHeight*scaleFactor+'rpx'}">
						<image :src="backImageUrl" mode="" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
				<!-- 标题 -->
				<view class="other-head-mod-mian-title" :style="{width:windowWidth - 184+'rpx',lineHeight:navHeightValue*scaleFactor+'rpx',
					paddingLeft:textPaddingLeft*scaleFactor+'rpx',fontSize:fontSize*scaleFactor+'rpx',
					fontWeight:fontWeight,color:titleColor}">
					{{textContent}}
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp()
	import {
		systemInfo
	} from '@/utils/systeminfo.js'
	export default {
		name: "HeadNav",
		props: {
			// 文本区域位置 left：左  center：中  
			textAlign: {
				type: String,
				default: 'center'
			},
			// 文本区内容
			textContent: {
				type: String,
				default: '北斗鲸'
			},
			// 文本区离左边的距离
			textPaddingLeft: {
				type: Number,
				default: 16
			},
			// 是否需要返回按钮
			isBackShow: {
				type: Boolean,
				default: true
			},
			// 文本区字体大小
			fontSize: {
				type: Number,
				default: 20 //px
			},
			// 文本区字体粗细
			fontWeight: {
				type: Number,
				default: 700
			},
			// 文本区返回按钮图片宽
			backImageWidth: {
				type: Number,
				default: 12 //px
			},
			// 文本区返回按钮图片高
			backImageHeight: {
				type: Number,
				default: 24 //px
			},
			// 返回按钮图标路径
			backImageUrl: {
				type: String,
				default: ''
			},
			// 导航栏整体背景颜色
			navBackgroundColor: {
				type: String,
				default: '#1890ff'
			},
			// 标题字体颜色
			titleColor: {
				type: String,
				default: '#ffffff',
			},

			/******** h5端，app端需要传入自定义导航栏高度 *******/
			navHeightValue: {
				type: Number,
				default: 44 //px
			}
		},
		computed: {
			// 文本区宽度
			navTextWidth() {
				if (this.textAlign === 'center') {
					return (this.windowWidth - (this.windowWidth - this.menubarLeft) * 2) + 'rpx'
				} else {
					return this.menubarLeft + 'rpx'
				}
			},
			// 文本区paddingLeft
			textPaddingleft() {
				if (this.textAlign === 'center') {
					return '0'
				} else {
					return this.textPaddingLeft + 'rpx'
				}
			}
		},
		data() {
			return {
				statusBarHeight: app.globalData.statusBarHeight, //状态栏高度
				navHeight: app.globalData.navHeight, //头部导航栏总体高度
				navigationBarHeight: app.globalData.navigationBarHeight, //导航栏高度
				customHeight: app.globalData.customHeight, //胶囊高度
				scaleFactor: app.globalData.scaleFactor, //比例系数
				menubarLeft: app.globalData.menubarLeft, //胶囊定位的左边left
				windowWidth: app.globalData.windowWidth * app.globalData.scaleFactor
			};
		},
		methods: {
			backEvent() {
				//已经登录
				console.log('点击头像',uni.getStorageSync('token'));
				if(uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../personal/index',
					});
				}else{
					uni.navigateTo({
						url: '../login/index',
					});
				}
			}
		},
		created() {
			/* 获取设备信息 */
			const SystemInfomations = systemInfo();
			uni.setStorageSync('hcSystemInfomations', JSON.stringify(SystemInfomations));
			/* 通用平台 */
			this.statusBarHeight = SystemInfomations.statusBarHeight //状态栏高度
			this.scaleFactor = SystemInfomations.scaleFactor //比例系数
			this.windowWidth = SystemInfomations.windowWidth //当前设备的屏幕宽度
			/* 微信小程序平台 */
			// #ifdef MP-WEIXIN || MP-ALIPAY
			this.navHeight = SystemInfomations.navHeight + SystemInfomations.statusBarHeight //头部导航栏总高度
			this.navigationBarHeight = SystemInfomations.navHeight //头部导航栏高度
			this.customHeight = SystemInfomations.menuButtonHeight //胶囊高度
			this.menubarLeft = SystemInfomations.menuButtonLeft //胶囊左边界距离左上角的距离
			// #endif

		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN || MP-ALIPAY */
	.wx-head-mod {
		box-sizing: border-box;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
	}

	.wx-head-mod-nav {
		box-sizing: border-box;
		width: 100%;
		position: absolute;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.wx-head-mod-nav-content {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
		position: relative;
	}

	/* 文本区 */
	.wx-head-mod-nav-content-mian {
		box-sizing: border-box;
		height: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/* 返回按钮 */
	.wx-head-mod-nav-content-back {
		box-sizing: border-box;
		width: 60rpx;
		height: 100%;
		/* background-color: aqua; */
		position: absolute;
		top: 0;
		left: 32rpx;
		display: flex;
		align-items: center;
		justify-content: left;
	}
	
	.wx-head-mod-nav-content-back-img {
		box-sizing: border-box;
	}
	/* #endif */
	
	/* #ifdef MP-ALIPAY */
	.wx-head-mod-nav-content-back-zfb{
		left: 80rpx;
	}
	/* #endif */

	/* #ifndef MP-WEIXIN || MP-ALIPAY */
	.other-head-mod {
		box-sizing: border-box;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.other-head-mod-mian {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	/* 返回按钮 */
	.other-head-mod-mian-back {
		box-sizing: border-box;
		height: 100%;
		width: 60rpx;
		position: absolute;
		left: 32rpx;
		top: 0;
		display: flex;
		align-items: center;
	}

	/* 标题 */
	.other-head-mod-mian-title {
		box-sizing: border-box;
		height: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/* #endif */
</style>
