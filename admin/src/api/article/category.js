import request from '@/utils/request'

export function queryCategoryList(categoryQueryDto) {
  return request({
    url: '/blog/category/queryCategoryList',
    method: 'post',
    data: categoryQueryDto
  })
}
