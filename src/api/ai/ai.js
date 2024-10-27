import requests from "@/http/index.js";

/**
 * 文生文
 * @returns {*}
 */
export const aiChatGetApi =() => requests({
    url:'/ai/chat',
    method:'get'
})

/**
 * 文生图
 * @returns {*}
 */
export const aiImageGetApi = () => requests({
    url: '/ai/image',
    method: 'get'
})

/**
 * 文生音频
 * @returns {*}
 */
export const aiAudioGetApi = () => requests({
    url: '/ai/audio',
    method: 'get'
})
