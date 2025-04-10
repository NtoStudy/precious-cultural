import requests from "@/api/index.js";

/**
 * 获取非遗列表 -- 分页
 * @param current
 * @param size
 * @param categories
 * @returns {*}
 */
export const hallNonHeritagePageGetApi = (current,size,categories) =>requests({
    url:'/hall/nonHeritage/page',
    method:'get',
    params:{
        current,
        size,
        categories
    }
})

/**
 * 根据id获取非遗详情
 * @param id
 * @returns {*}
 */
export const hallNonHeritageByIdGetApi   = (id) =>requests({
    url:`/hall/nonHeritage/${id}`,
    method:'get'
})

/**
 * 根据id获取非遗图片
 * @param id
 * @returns {*}
 */
export const hallNonHeritageImgByIdGetApi = (id) => requests({
    url:`/hall/nonHeritageImg/${id}`,
    method:'get'
})
