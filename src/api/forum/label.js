import requests from "@/http/index.js";

/**
 * 获取论坛标签列表
 * @returns {*}
 */
export const forumLabelGetApi = () => requests({
    url:"/forum/label",
    method:"get"
})
