import axios from "axios"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loadingObj = null
const Service = axios.create({
    timeout: 8 * 1000,
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
//请求拦截-增加loading，对请求统一处理
Service.interceptors.request.use(config => {
    loadingObj = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0,0,0,0.7)'
    })
    return config
})
//响应拦截-对返回结果统一处理
Service.interceptors.response.use(response => {
    loadingObj.close()
    const data = response.data
    if (data.meta.status >= 400) {
        //请求出错
        ElMessage({
            message: data.meta.msg,
            type: 'error',
            duration: 2 * 1000
        })
    }
    return data
}, error => {
    loadingObj.close()
    ElMessage({
        message: '服务器错误',
        type: 'error',
        duration: 2 * 1000
    })
})
//post请求
export const Post = config => {
    return Service({
        ...config,
        method: 'post',
        data: config.data,
        params: config.params
    })
}
//get请求
export const Get = config => {
    return Service({
        ...config,
        method: 'get',
        params: config.params
    })
}
//delete请求
export const Delete = config => {
    return Service({
        ...config,
        method: 'delete',
        data: config.data,
        params: config.params
    })
}
//put请求
export const Put = config => {
    return Service({
        ...config,
        method: 'put',
        data: config.data,
        params: config.params
    })
}