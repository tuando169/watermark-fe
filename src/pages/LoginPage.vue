<script setup lang="ts">
import {apiEndpoints} from "@/apiEndpoints";

</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <a :href="apiEndpoints.auth.loginGoogle"/>Login by Google
  </div>
</template>

<style scoped>

</style>