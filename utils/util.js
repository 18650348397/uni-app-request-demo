const amapFile = require('./amap-wx.130.js') //引入高德地图 ，根据自己放置的文件路径来决定
const myAmapFun = new amapFile.AMapWX({
	key: '6d0fa727318fc06d33bcbcd33bbf964e', //高德地图申请的微信小程序key，公司：e815590d909976ecae1a3bbc20bb8a05；燕珠：6d0fa727318fc06d33bcbcd33bbf964e
});

//逆地址解析（高德）
function wxGetAddress(longitude, latitude) {
	//根据传递进来经纬度进行反解析，调用的是高德给的方法
	return new Promise((resolve, reject) => {
		myAmapFun.getRegeo({
			location: `${longitude},${latitude}`,
			success: (res) => {
				console.log('逆地址解析成功', res);
				resolve(res[0])
			},
			fail: (err) => {
				console.log('逆地址解析失败', err);
				resolve(null)
			}
		})
	})

}

//手机号校验
function isPhone(value) {
	value = String(value).trim(); //去除首尾空格
	return value.length === 11 && /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/.test(value);
}


//身份证校验
function isIdentityCard(value) {
	value = String(value).trim(); //去除首尾空格
	return value.length === 18 &&
		/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
}


//坐标格式转换(lat => latitude；lon = > longitude)
function coordinateFormatConversion(arr) {
	let newArr = [];
	if (arr && arr.length) {
		arr.map((i, j) => {
			newArr.push({
				latitude: i.lat,
				longitude: i.lon
			})
		})
	}
	return newArr
}


//秒转换为时分秒
function formatSeconds(value) {
	var secondTime = parseInt(value) // 秒
	var minuteTime = 0 // 分
	var hourTime = 0 // 小时
	var dayTime = 0 // 天
	var result = ''
	if (value < 60) {
		result = secondTime + '秒'
	} else {
		if (secondTime >= 60) { // 如果秒数大于60，将秒数转换成整数
			// 获取分钟，除以60取整数，得到整数分钟
			minuteTime = parseInt(secondTime / 60)
			// 获取秒数，秒数取佘，得到整数秒数
			secondTime = parseInt(secondTime % 60)
			// 如果分钟大于60，将分钟转换成小时
			if (minuteTime >= 60) {
				// 获取小时，获取分钟除以60，得到整数小时
				hourTime = parseInt(minuteTime / 60)
				// 获取小时后取佘的分，获取分钟除以60取佘的分
				minuteTime = parseInt(minuteTime % 60)
				if (hourTime >= 24) {
					// 获取天数， 获取小时除以24，得到整数天
					dayTime = parseInt(hourTime / 24)
					// 获取小时后取余小时，获取分钟除以24取余的分；
					hourTime = parseInt(hourTime % 24)
				}
			}
		}
		if (secondTime > 0) {
			secondTime = parseInt(secondTime) >= 10 ? secondTime : '0' + secondTime
			result = '' + secondTime + '秒'
		}
		if (minuteTime > 0) {
			minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : '0' + minuteTime
			result = '' + minuteTime + '分' + result
		}
		if (hourTime > 0) {
			result = '' + parseInt(hourTime) + '小时' + result
		}
		if (dayTime > 0) {
			result = '' + parseInt(dayTime) + '天' + result
		}
	}
	return result
}


//格式化时间
function formatTime_curret(diff) {
	let using = '';
	if (diff < 1) using = diff * 60 + '秒';
	else if (diff <= 60) using = diff.toFixed(0) + '分钟'; //分钟
	else if (diff > 60 && diff < 1440) { //小时
		using = Math.floor(diff / 60) + '小时' + (diff % 60).toFixed(0) + '分钟';
	}
	return using;
}


//计算坐标之间的距离
function getDistance(lng1, lat1, lng2, lat2) {
	let alpha = lat1 * Math.PI / 180.0;
	return Math.sqrt(Math.pow((lat1 - lat2) * 111.12, 2) + Math.pow((lng1 - lng2) * Math.cos(alpha) * 111.12, 2));
}



//确认提示modal框，有取消按钮
function utilShowModal(content, cb, error) {
	uni.showModal({
		title: '温馨提示',
		content: content,
		showCancel: true,
		success: function(res) {
			if (res.confirm) {
				cb && cb();
			} else {
				error && error();
			}
		}
	});
}




module.exports = {
	wxGetAddress,
	isPhone,
	isIdentityCard,
	coordinateFormatConversion,
	formatSeconds,
	formatTime_curret,
	getDistance,
	utilShowModal
};