import http from '@/service/net/httpClient.js'

const PostCateApi = {}

/**
 * 资讯分类
 */
PostCateApi.list = () => {
	return http.get('/post/categories')
}

export default PostCateApi