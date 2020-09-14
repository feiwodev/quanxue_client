import http from '@/service/net/httpClient.js'

const ChapterApi = {}

/**
 * 书籍章节列表
 */
ChapterApi.list = (bookId) => {
	return http.get('/book/chapters/'+ bookId)
}

export default ChapterApi