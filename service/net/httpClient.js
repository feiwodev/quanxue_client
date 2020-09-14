import request from '@/service/net/request.js'

const api = {}
api.TICKET_SALES = '/ticketSales'
api.SALES_ADMIN = '/salesAdmin'
api.PAY = '/pay'


api.get = (uri, data, options) => request.http(uri,'GET',data, options);

api.post = (uri, data, options) => request.http(uri, 'POST', data, options);

api.delete = (uri, data, options) => request.http(uri, 'DELETE', data, options);

api.put = (uri, data, options) => request.http(uri, 'PUT', data, options);

export default api