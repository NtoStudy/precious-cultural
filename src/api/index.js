// 登录接口
import requests from "@/http/index.js";

/**
 * 用户登录接口
 * @param account
 * @param password
 * @returns {*}
 */
export const userLoginApi = (account, password) => requests({
    url: '/user/login',
    method: 'post',
    data:{
        account: account,
        password: password
    }
})
/**
 * 分页查询用户全景图
 * @param current
 * @param size
 * @returns {*}
 */
export const userPanoramaPageApi = (current, size) => requests({
    url:'/user/panorama/page',
    method: 'get',
    params: { current, size }
})
/**
 * 根据非遗id查询全景图
 * @param id
 * @returns {*}
 */
export const userPanoramaByIdApi = (id) => requests({
    url:`/user/panorama/${id}`,
    method: 'get',
})
/**
 * 分页查询用户非遗信息
 * @returns {*}
 */
export const userNonHeritagePageApi = ( current , size , categories ) => requests({
    url:'/user/nonHeritage/page',
    method: 'get',
    params: { current, size, categories }
})















/**
 * 根据id查询指定非遗信息
 * @param id
 * @returns {*}
 */
export const userNonHeritageByIdApi = (id) => requests({
    url:`/user/nonHeritage/${id}`,
    method: 'get'
})

/**
 * 根据非遗id查询非遗图
 * @param id
 * @returns {*}
 */
export const userNonHeritageImgByIdApi = (id) => requests({
    url:`/user/nonHeritageImg/${id}`,
    method: 'get'
})

export const userInheritorsByIdApi = (id)=> requests({
    url:`/user/inheritors/${id}`,
    method: 'get'
})


