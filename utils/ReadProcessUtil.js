/**
 * 阅读进度工具类
 */
const READ_PROCESS = 'read_book_process'
const ReadProcess = {}

ReadProcess.set = (bookId, process) => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: READ_PROCESS+'_'+bookId,
			success(res) {
				const readProcess = res.data
				readProcess.process = process
				uni.setStorage({
					key: READ_PROCESS+'_'+bookId,
					data: readProcess,
					success(res) {
						console.log('set read book process sucess')
					},
					fail() {
						console.log('set read book process fail')
					}
				})
			},
			fail() {
				uni.setStorage({
					key: READ_PROCESS+'_'+bookId,
					data: {bookId, process},
					success(res) {
						console.log('set read book process sucess')
					},
					fail() {
						console.log('set read book process fail')
					}
				})
			}
		})
	})
}

ReadProcess.get = (bookId) => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key:READ_PROCESS+'_'+bookId,
			success(res) {
				resolve(res.data)
			},
			fail() {
				resolve(null)
				console.log('get read book process fail')
			}
		})
	})
}

export default ReadProcess