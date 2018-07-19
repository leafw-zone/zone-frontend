import request from '@/utils/request'

export function queryAccountMainList(accountMainQueryDto) {
  return request({
    url: '/ams/accountMain/queryAccountMainList',
    method: 'post',
    data: accountMainQueryDto
  })
}
