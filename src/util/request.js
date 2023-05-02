import { Post, Get, Delete, Put } from './service'
import store from '@/store/index'
/* 登录 */
export const loginApi = data => {
    return Post({
        url: '/login',
        data
    })
}
/* 用户列表 */
//获取\查询用户列表
export const getUserListApi = params => {
    return Get({
        url: '/users',
        headers: { Authorization: store.state.user.userInfo },
        params
    })
}
//添加用户
export const addUserApi = data => {
    return Post({
        url: '/users',
        headers: { Authorization: store.state.user.userInfo },
        data,
    })
}
//删除用户
export const deleteUserApi = id => {
    return Delete({
        url: `/users/${id}`,
        headers: { Authorization: store.state.user.userInfo },
    })
}
//修改用户状态
export const changeUserStateApi = (id, type) => {
    return Put({
        url: `/users/${id}/state/${type}`,
        headers: { Authorization: store.state.user.userInfo },
    })
}
//编辑用户信息
export const editUserApi = ({ id, ...data }) => {
    return Put({
        url: `/users/${id}`,
        headers: { Authorization: store.state.user.userInfo },
        data
    })
}

/* 角色列表 */
//获取角色列表
export const getRoleListApi = () => {
    return Get({
        url: '/roles',
        headers: { Authorization: store.state.user.userInfo },
    })
}
//添加角色
export const addRoleApi = data => {
    return Post({
        url: '/roles',
        headers: { Authorization: store.state.user.userInfo },
        data
    })
}
//删除角色
export const deleteRoleApi = id => {
    return Delete({
        url: `/roles/${id}`,
        headers: { Authorization: store.state.user.userInfo },
    })
}
//编辑角色
export const editRoleApi = ({ id, ...data }) => {
    return Put({
        url: `/roles/${id}`,
        headers: { Authorization: store.state.user.userInfo },
        data
    })
}
/* 商品列表 */
//获取商品列表
export const getGoodListApi = params => {
    return Get({
        url: '/goods',
        headers: { Authorization: store.state.user.userInfo },
        params
    })
}