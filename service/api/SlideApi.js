import http from '../net/httpClient.js'

const SlideApi = {}

SlideApi.list = () => {
	return http.get('/slides')
}

export default SlideApi