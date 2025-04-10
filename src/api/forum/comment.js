import requests from "@/api/index.js";

/**
 * 获取文章评论列表
 * @param articleId
 * @returns {*}
 */
export const forumCommentGetApi = (articleId) => requests({
    url:'/forum/comment',
    method:'get',
    params:{
        articleId
    }
})

/**
 * 发布文章评论
 * @param content
 * @param createUser
 * @param articleId
 * @param preId
 * @returns {*}
 */
export const forumCommentPostApi = (content,createUser,articleId,preId) => requests({
    url:'/forum/comment',
    method:'post',
    data: {
        content,
        createUser,
        articleId,
        preId
    }
})

/**
 * 删除文章评论
 * @param commentId
 * @returns {*}
 */
export const forumCommentDeleteApi = (commentId) => requests({
    url:'/forum/comment',
    method:'delete',
    params: {
        commentId
    }
})
