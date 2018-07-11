import request from '@/utils/request'

export function queryTagList(tagQueryDto) {
  return request({
    url: '/blog/tag/queryTagList',
    method: 'post',
    data: tagQueryDto
  })
}
