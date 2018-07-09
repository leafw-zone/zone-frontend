import request from '@/utils/request'

export function queryUserList(userQueryDto) {
  return request({
    url: '/user/queryUserList',
    method: 'post',
    data: userQueryDto
  })
}
