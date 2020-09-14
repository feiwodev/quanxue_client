const Toast = {}

Toast.info = (msg) => {
	uni.showToast({
		title: msg,
		image: '../../static/icons/ic_info.png'
	})
}

Toast.success = (msg) => {
	uni.showToast({
		title: msg,
		image: '../../static/icons/ic_success.png'
	})
}

Toast.error = (msg) => {
	uni.showToast({
		title: msg,
		image: '../../static/icons/ic_error.png'
	})
}

export default Toast