<script setup>
import pageOne from './pageOne/index.vue'
import pageTwo from './pageTwo/index.vue'
import pageThree from './pageThree/index.vue'
import pageFour from './pageFour/index.vue'
</script>

<template>
  <div class="home-container">
    <pageOne style="height: 100vh;"/>
    <pageTwo style="height: 100vh;"/>
    <pageThree style="height: 100vh;"/>
    <pageFour style="height: 100vh;"/>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  scroll-behavior: smooth;
}

</style>
