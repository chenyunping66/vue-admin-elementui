import request from '@/utils/request'

// 查询全部部门（分层级）
export const CheckAlldepartments = params => {
  return request({
    url: '/department/list',
    method: 'get',
    params
  })
}

// 部门添加
export const AddDepartments = data => {
  return request({
    url: '/department ',
    method: 'post',
    data
  })
}
7
// 部门列表
export const DepartmentList = params => {
  return request({
    url: '/departments',
    method: 'get',
    params
  })
}

// 职员列表
export const positions = params => {
  // console.log(params, '------------------')
  return request({
    url: '/position/List',
    method: 'get',
    params
  })
}

// 添加职位
export const AddPosition = data => {
  return request({
    url: '/position',
    method: 'post',
    data
  })
}

// 获取全部职位
export const AllPosition = params => {
  return request({
    url: '/positions',
    method: 'get',
    params
  })
}

// 职位搜索
export const Searchposition = params => {
  return request({
    url: '/position',
    method: 'get',
    params
  })
}

// 渠道列表
export const channel = params => {
  console.log(params, '------------------')
  return request({
    url: '/channel/list',
    method: 'get',
    params
  })
}

// 编辑渠道
export const ChannelEdit = params => {
  return request({
    url: '/channel',
    method: 'put',
    params
  })
}

// 获取全部取到
export const AllChannel = params => {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}

// 渠道模块删除列表
export const delteChannel = params => {
  return request({
    url: '/channel',
    method: 'params',
    params
  })
}

// 用户列表
export const UserList = params => {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

// 菜单列表
export const MenuList = params => {
  return request({
    url: '/menus',
    method: 'get',
    params
  })
}

// 添加菜单列表
export const MenuAdd = data => {
  return request({
    url: '/menu',
    method: 'POST',
    data
  })
}

// 添加用户
export const UserAdd = data => {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 获取用户详情列表
export const UserDetatil = data => {
  return request({
    url: '/userDetail',
    method: 'post',
    data
  })
}

// 删除用户
export const UserDelete = params => {
  return request({
    url: '/user',
    method: 'delte',
    params
  })
}

// // 获取用户详情
// export const  = params => {
//   return request({
//     url: '/userDetail/1'
//   })
// }

// 添加用户详情
export const UserDetailAdd = data => {
  return request({
    url: '/userDetail',
    method: 'post',
    data
  })
}

