import request from '@/utils/request'

// export function login(userName, password) {
//   return request({
//     url: '/user/login',
//     method: 'get',
//     params: {
//       userName,
//       password
//     }
//   })
// }

export function login(loginForm) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginForm
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
