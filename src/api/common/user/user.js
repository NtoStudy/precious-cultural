import requests from "@/http/index.js";

/**
 * 获取用户信息
 * @param userId
 * @returns {*}
 */
export const userGetUserInfoGetApi = (userId) => requests({
    url: '/user/getUserInfo',
    method: 'GET',
    params: {
        userId
    }
})


/**
 * 获取关注用户列表
 * @returns {*}
 */
export const userGetFollowUsersGetApi = () => requests({
    url: '/user/getFollowUsers',
    method: 'GET'
})

/**
 * 更新用户基本信息
 * @param data
 * @returns {*}
 */
export const userUpdateUserBasicInfoPostApi = (data) => requests({
    url: '/user/updateUserBasicInfo',
    method: 'POST',
    data: {
        data
    }
})

/**
 * 更新用户密码
 * @param oldPassword
 * @param newPassword
 * @returns {*}
 */
export const userUpdatePasswordPostApi = (oldPassword, newPassword) => requests({
    url: '/user/updatePassword',
    method: 'POST',
    data: {
        oldPassword,
        newPassword
    }
})

/**
 * 获取用户关注状态
 * @param toUser
 * @returns {*}
 */
export const userUpdateFollowStateGetApi = (toUser) => requests({
    url: '/user/updateFollowState',
    method: 'GET',
    params: {
        toUser
    }
})

/**
 * 获取关注/粉丝数量
 * @param userId
 * @returns {*}
 */
export const userGetFollowCountGetApi = (userId) => requests({
    url: '/user/getFollowCount',
    method: 'GET',
    params: {
        userId
    }
})

/**
 * 获取文章点赞状态
 * @param articleId
 * @returns {*}
 */
export const userUpdateLikeStateGetApi = (articleId) => requests({
    url: '/user/updateLikeState',
    method: 'GET',
    params: {
        articleId
    }
})

/**
 * 获取评论点赞状态
 * @param commentId
 * @returns {*}
 */
export const userUpdateLikeCommentStateGetApi = (commentId) => requests({
    url: '/user/updateLikeCommentState',
    method: 'GET',
    params: {
        commentId
    }

})
