import request from '@/utils/request'

export function getTokenStr() {
  return request({
    url: '/token/getToken',
    method: 'get'
  })
}
