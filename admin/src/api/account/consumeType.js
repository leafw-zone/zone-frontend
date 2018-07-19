import request from '@/utils/request'

export function queryConsumeConfigList(consumeConfigQueryDto) {
  return request({
    url: '/ams/consumeconfig/queryConsumeConfigList',
    method: 'post',
    data: consumeConfigQueryDto
  })
}
