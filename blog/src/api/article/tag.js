import request from '@/utils/request'

export function queryTagList(tagQueryDto) {
  return request({
    url: '/blog/tag/queryTagList',
    method: 'post',
    data: tagQueryDto
  })
}

export function saveTag(tagDto) {
  return request({
    url: '/blog/tag/saveTag',
    method: 'post',
    data: tagDto
  })
}
