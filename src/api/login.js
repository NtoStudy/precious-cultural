import requests from "@/http/index.js";

export const userLoginPostApi = (account,password) => requests({
    url:'/user/login',
    method:'post',
    data:{
        account,
        password
    }
})
