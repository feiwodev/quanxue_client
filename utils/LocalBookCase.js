import toast from '@/utils/Toast.js'
import arrayUtil from '@/utils/ArrayUtil.js'
const BOOK_CASE = 'book_case'

const BookCase = {}

// 检测书籍是否已经收藏
BookCase.isExists = (bookId) => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: BOOK_CASE,
			success(res) {
				const bookCases = JSON.parse(res.data)
				const index = arrayUtil.findIndex(bookCases, bookId)
				if (index !== null) {
					resolve(true)
				}else {
					resolve(fase)
				}
			},
			fail() {
				resolve(false)
			}
		})
	})
}

// 移出书架
BookCase.remove = (bookId) => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: BOOK_CASE,
			success(res) {
				const bookCases = JSON.parse(res.data)
				const index = arrayUtil.findIndex(bookCases, bookId)
				if (index != null) {
					bookCases.splice(index, 1)
					if (bookCases.length > 0) {
						uni.setStorage({
							key: BOOK_CASE,
							data: JSON.stringify(bookCases),
							success() {
								resolve(bookCases)
								toast.success('取消收藏成功')
							},fail() {
								toast.error('取消收藏失败')
							}
						})
					}else {
						uni.removeStorage({
							key: BOOK_CASE,
							success() {
								resolve([])
								toast.success('取消收藏成功')
							},
							fail() {
								toast.error('取消收藏失败')
							}
						})
					}
				}
			}
		})
	})
}

// 加入本地书架
BookCase.add  = (bookId) => {
	console.info('book id -->', bookId)
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: BOOK_CASE,
			success(res) {
				const bookCases = JSON.parse(res.data)
				bookCases.push(bookId)
				uni.setStorage({
					key: BOOK_CASE,
					data: JSON.stringify(bookCases),
					success() {
						resolve(bookCases)
						toast.success('收藏成功')
					},
					fail(e) {
						toast.error('收藏失败')
					}
				})
			},
			fail(e) {
				const bookCases = []
				bookCases.push(bookId)
				uni.setStorage({
					key: BOOK_CASE,
					data: JSON.stringify(bookCases),
					success() {
						resolve(bookCases)
						toast.success('收藏成功')
					},
					fail(e) {
						toast.error('收藏失败')
					}
				})
			}
		})
	})
}

/**
 * 获取书架列表
 */
BookCase.list = () => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: BOOK_CASE,
			success(res) {
				resolve(JSON.parse(res.data))
			},
			fail() {
				resolve([])
			}
		})
	})
}

export default BookCase