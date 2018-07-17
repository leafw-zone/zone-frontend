import request from '@/utils/request'

export function queryCategoryList(categoryQueryDto) {
  return request({
    url: '/blog/category/queryCategoryList',
    method: 'post',
    data: categoryQueryDto
  })
}

export function saveCategory(categoryDto) {
  return request({
    url: '/blog/category/saveCategory',
    method: 'post',
    data: categoryDto
  })
}
