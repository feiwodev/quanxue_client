import http from '@/service/net/httpClient.js'

const BookCateApi = {}

BookCateApi.list = () => {
	return http.get('/book/categories')
}

export default BookCateApi