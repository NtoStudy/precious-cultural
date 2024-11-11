<script setup>
import {aiAudioGetApi, aiChatGetApi, aiImageGetApi} from "@/api/common/ai/ai.js";
// 处理响应结果
const responseMessage = async() => {
  if(typeIndex.value === 1){
    const data = await aiChatGetApi( inputMessage.value,1)
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 2){
    const data = await aiImageGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }else if(typeIndex.value === 3){
    const data = await aiAudioGetApi( inputMessage.value )
    console.log(data)
    messages.value.push({ text: data.data, self: false });
  }
}
</script>

<template>

</template>

<style lang="scss" scoped>

</style>
