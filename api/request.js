import config from './config.js';

const request = (url = '', method = 'GET', data = {}, header = {   //这里这样封装是为了后续具体组件中使用时可以直接传参,需按此顺序传参；而不需要写url：xxx等键值对传参
	//具体的header和后端商同后再编写，这里以常见的token为例
	'token': uni.getStorageSync('token') ? uni.getStorageSync('token') : '',
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.api() + url, //接口地址：前缀+方法中传入的地址
			method: method, //请求方法
			data: data, //传递参数
			header: header, //自定义头部，和后端商同后编写
			success: (res) => {
				console.log('request.js文件的通用接口请求封装返回的结果数据',res);
				//注：因为这里对请求成功的没有统一设置抛错提示，所以后续具体组件中使用接口请求的res除200（实际以后端同事定好的为准）成功外的其他code需要额外写抛错提示
				if (res.data.code == 'xxx') { //自定请求失败的情况，这里以常见的token失效或过期为例
					uni.removeStorageSync('token');
					uni.showModal({
						showCancel: false,
						title: '温馨提示',
						content: res.data.msg,
						success: function(result) {
							if (result.confirm) {
								// uni.reLaunch({
								// 	url: '/pages/login/index'    //这里需用绝对路径才可
								// });
							}
						}
					});
				}
				resolve(res.data) //成功
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败的msg；
			//注：因为这里对于请求失败的设置统一抛错提示了，所以后续具体组件中使用接口请求的catch中不需要再写抛错提示
			fail: (err) => {
				uni.showToast({
					title: "" + err.msg,
					icon: 'none'
				});
				reject(err)
			}
		})
	})
}

export default request;