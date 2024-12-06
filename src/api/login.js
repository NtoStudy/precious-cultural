import requests from "@/http/index.js";

/**
 * 用户登录
 * @param account
 * @param password
 * @returns {*}
 */
export const userLoginPostApi = (account,password) => requests({
    url:'/user/login',
    method:'post',
    data:{
        account,
        password
    }
})

/**
 * 用户注册
 * @param account
 * @param password
 * @returns {*}
 */
export const userRegisterPostApi = (account, password) => requests({
    url:"/user/register",
    method:"post",
    data: {
        account,
        password
    }
})
