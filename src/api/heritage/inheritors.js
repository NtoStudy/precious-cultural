import requests from "@/http/index.js";

/**
 * 获取指定祠堂的继承者列表 -- 分页
 * @param current
 * @param size
 * @returns {*}
 */
export const hallInheritorsPageGetApi = (current,size) => requests({
    url:'/hall/inheritors/page',
    method:'get',
    params:{
        current,
        size
    }
})

/**
 * 根据id查询 传承人信息
 * @param id
 * @returns {*}
 */
export const hallInheritorsByIdGetApi = (id) => requests({
    url:`/hall/inheritors/${id}`,
    method:'get'
})

/**
 * 根据祠堂id查询 传承人列表
 * @param id
 * @returns {*}
 */
export const hallInheritorsGetApi = (id) => requests({
    url:'/hall/inheritors',
    method:'get',
    params:{
        id
    }
})
