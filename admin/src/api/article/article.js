import request from '@/utils/request'

export function postArticle(articleDto) {
  return request({
    url: '/blog/article/postArticle',
    method: 'post',
    data: articleDto
  })
}

export function queryArticleList(articleQueryDto) {
  return request({
    url: '/blog/article/queryArticleList',
    method: 'post',
    data: articleQueryDto
  })
}
