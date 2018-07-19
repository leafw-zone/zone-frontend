import request from '@/utils/request'

export function saveAccountLog(accountLogDto) {
  return request({
    url: '/ams/accountLog/saveAccountLog',
    method: 'post',
    data: accountLogDto
  })
}

export function queryAccountLogList(accountLogQueryDto) {
  return request({
    url: '/ams/accountLog/queryAccountLogList',
    method: 'post',
    data: accountLogQueryDto
  })
}
