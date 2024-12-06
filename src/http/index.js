import axios from 'axios'
import {useUserInfoStore} from "@/store/modules/user.js";
const userStore = useUserInfoStore()

const requests = axios.create({
    // baseURL: 'http://maddfu.natappfree.cc',
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'token': userStore.userInfo?.token
    }
})

requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['token'] = userStore.userInfo?.token || '';
    return config;
}, function (error) {
    // 对请求错误做些什么
    alert(error);
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default requests
