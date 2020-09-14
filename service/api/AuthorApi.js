import http from '@/service/net/httpClient.js'

const AuthorApi = {}

AuthorApi.ship = (offset = 1, limit = 20) => {
	return http.get('/author/ship',{offset, limit}, {loading:'加载中...'})
}

export default AuthorApi