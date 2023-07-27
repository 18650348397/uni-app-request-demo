export default {
	//接口请求域名配置
	api: function() {
		let curVersion = uni.getAccountInfoSync().miniProgram.envVersion;
		switch (curVersion) {
			case "develop": //开发版
				return "https://sharebk.oss-cn-hangzhou.aliyuncs.com";
			case 'trial': //体验版
				return "http://xxx.xxx.xxx.xxx:xxx"
			case 'release': //正式版
				return "http://xxx.xxx.xxx.xxx:xxx"
			default: //其他,默认调用正式版
				return "http://xxx.xxx.xxx.xxx:xxx"
		}
	}
}
