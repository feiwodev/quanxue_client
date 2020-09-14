import http from '@/service/net/httpClient.js'

const PostApi = {}

/**
 * 获取最新资讯
 */
PostApi.top = () => {
	return http.get('/post/top')
}

/**
 * 资讯详情
 */
PostApi.detail = (postId) => {
	return http.get('/post/'+postId,{},{loading:'加载中...'})
}

/**
 * 根据资讯分类，获取资讯
 */
PostApi.listByCateId = (cateId, offset=1, limit=15) => {
	return http.get('/post/byCate/' + cateId+'?offset='+offset+'&limit='+limit)
}

export default PostApi