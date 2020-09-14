
const BASE_URL = 'http://192.168.0.102:9898/api/v1'


const request = {}
const headers = {
	"content-type": "application/json;charset=utf-8"
}


request.http = (uri, method, data,options) => {

	// 判断类型，拼接url
	const url = BASE_URL + uri
	if (url == undefined || url === '') {
		uni.showToast({
			icon:'none',
			title:'url类型错误',
			duration:1500
		});
		return
	}
	
	if (data == null || data === undefined) {
		data = new Object
	}
	
	if (options !== undefined && options.loading !== '' && options.loading.length > 0) {
		uni.showLoading({
			title: options.loading,
			mask: options.mask
		})
	}

	console.info('request url ---->',url)
	console.info('reqData ---> ' , data)
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method,
			header: headers,
			success: (res) => {
				if (options !== undefined && options.loading !== '' && options.loading.length > 0) {
					uni.hideLoading()
				}
				
				if (res.statusCode === 200) {
					console.info(url+' : response res ---> ', res)
					if (res.data.code === 0) {
						resolve(res.data.data)
					}else {
						uni.showToast({
							icon:'none',
							title: res.data.msg,
							duration:1500
						});
					}
				}else if(res.statusCode === 405) {
					uni.showToast({
						icon:'none',
						title:'请求方法错误',
						duration:1500
					});
				}else {
					uni.showToast({
						icon:'none',
						title:'请求错误 : '+ res.statusCode,
						duration:1500
					});
				}
			},
			fail(err) {
				if (options !== undefined && options.loading !== '' && options.loading.length > 0) {
					uni.hideLoading()
				}
				uni.showToast({
					icon:'none',
					title: err.errMsg,
					duration:1500
				});
				reject(err)
			}
		})
	})
}

export default request