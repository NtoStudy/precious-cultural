// 登录接口
import requests from "@/http/index.js";

export const userLoginApi = (username, password) => requests({
    url: '/user/login',
    method: 'post',
    data:{
        username: username,
        password: password
    }
})

// export const userLoginApiAA = (username, password) => requests({
//     url: '/user/login',
//     method: 'post',
//     data:{
//         username: username,
//         password: password
//     }
// })
