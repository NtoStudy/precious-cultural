import requests from "@/http/index.js";

/**
 * 查询全景图列表 -- 分页
 * @param current
 * @param size
 * @returns {*}
 */
export const hallPanoramaPageGetApi = (current,size) => requests({
    url:'/hall/panorama/page',
    method:'get',
    params:{
        current,
        size
    }
})

/**
 * 根据id查询全景图
 * @param id
 * @returns {*}
 */
export const hallPanoramaByIdGetApi = (id) => requests({
    url:`/hall/panorama/${id}`,
    method:'get'
})
