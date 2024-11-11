import axios from "axios";
import { getLocalStorage } from '@/utils/catch.js'
const token = getLocalStorage('token')
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'token': token
    }
})
/**
 * 文生文
 * @returns {*}
 */
export const aiChatGetApi =(message,chatId = 1) => request({
    url:'/ai/chat',
    method:'get',
    params:{
        message,
        chatId
    }
})

/**
 * 文生图
 * @returns {*}
 */
export const aiImageGetApi = (message) => request({
    url: '/ai/image',
    method: 'get',
    params: {
        message
    }
})

/**
 * 文生音频
 * @returns {*}
 */
export const aiAudioGetApi = (message) => request({
    url: '/ai/audio',
    method: 'get',
    params: {
        message
    }
})
