import requests from "@/http/index.js";

/**
 * 获取论坛文章列表 - 分页
 * @param currentPage
 * @param pageSize
 * @param title
 * @param labelIds
 * @param createUser
 * @param id
 * @returns {*}
 */
export const forumArticlePageGetApi = (currentPage,pageSize,title,labelIds,createUser,id) => requests({
    url:'/forum/article/page',
    method:'get',
    data:{
        currentPage,
        pageSize,
        title,
        labelIds,
        createUser,
        id
    }
})

/**
 * 获取用户发布的文章列表 - 分页
 * @param current
 * @param size
 * @param userId
 * @returns {*}
 */
export const forumArticleGetPersonalGetApi = (current,size,userId) => requests({
    url:'/forum/article/getPersonal',
    method:'get',
    params:{
        current,
        size,
        userId
    }
})

/**
 * 获取点过赞的文章列表 - 分页
 * @param current
 * @param size
 * @param likeUser
 * @returns {*}
 */
export const formArticleGetLikesGetApi = (current,size,likeUser) => requests({
    url:'/forum/article/getLikes',
    method:'get',
    params:{
        current,
        size,
        likeUser
    }
})


/**
 * 获取文章详情
 * @param ids
 * @param isPv
 * @returns {*}
 */
export const forumArticleGetApi = (ids,isPv) => requests({
    url:'/forum/article',
    method:'get',
    params:{
        ids,
        isPv
    }
})
// TODO :写文章参数待确定

export const forumArticlePostApi = () => requests({
    url:'/forum/article',
    method:'post',
})

/**
 * 删除文章
 * @param id
 * @returns {*}
 */
export const forumArticleDeleteApi = (id) => requests({
    url:'/forum/article',
    method:'delete',
    params: {
        id
    }
})


