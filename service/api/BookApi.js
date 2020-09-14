import http from '@/service/net/httpClient.js'

const BookApi = {}

/**
 * 最新书籍
 */
BookApi.top = () => {
	return http.get('/book/top')
}

/**
 * 书籍详情
 */
BookApi.detail = (bookId) => {
	return http.get('/book/'+bookId)
}

/**
 * 书籍列表by分类
 */
BookApi.listByCateId = (cateId, offset = 1, limit = 15) => {
	return http.get('/books/'+cateId,{offset,limit})
}

/**
 * 书籍章节详情
 */
BookApi.chapterDetail = (chapterId) => {
	return http.get('/book/chapter/'+chapterId,{}, {loading:'正在加载中...',mask:true})
}

/**
 * 书籍推荐
 */
BookApi.recommend = (offset = 1, limit = 15) => {
	return http.get('/book/recommend?offset='+offset+'&limit='+limit)
}

/**
 * 根据作者ID获取书籍列表
 */
BookApi.findByAuthorId = (authorId) => {
	return http.get('/books/author/'+ authorId)
}

/**
 * 根据书籍ids获取书籍信息
 */
BookApi.findAllByBookIds = (bookIds) => {
	return http.post('/booksByIds', bookIds, {loading: '加载中...'})
}

export default BookApi