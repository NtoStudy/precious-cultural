import requests from "@/api/index.js";

/**
 * 上传文件
 * @param file
 * @returns {*}
 * @constructor
 */
export const UploadPostApi = (file)=>requests({
    url:'/upload',
    method:'post',
    data: {file}
})

