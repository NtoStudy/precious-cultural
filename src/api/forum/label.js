import requests from "@/http/index.js";

/**
 * 获取论坛标签列表
 * @returns {*}
 */
export const forumLabelGetApi = () => requests({
    url:"/forum/label",
    method:"get"
})

/**
 * 创建论坛标签
 * @param labelName
 * @returns {*}
 */
export const forumLabelPostApi = (labelName) => requests({
  url:'/forum/label',
  method:'post',
  data: {
    labelName
  }
})

/**
 * 删除论坛标签
 * @param ids
 * @returns {*}
 */
export const forumLabelDeleteApi = (ids) => requests({
  url:'/forum/label',
  method:'delete',
  data: {
    ids
  }
})
