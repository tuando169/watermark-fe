<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {apiEndpoints} from "@/apiEndpoints";
import type {Image} from "@/types";

const imageList = ref<Image>([])
const selectedImage = ref<Image>({})
const value = ref(0)
const color = ref('')

fetchData()

async function fetchData() {
  const res = await axios.get(apiEndpoints.mediaFile.getList)
  imageList.value = res.data
}

</script>

<template>
  <div class="h-full w-full flex">
    <div class="w-1/4 h-[calc(100vh_-_40px)] bg-gray-100">
      <div v-for="image in imageList" :key="image.id"
           :class="selectedImage._id == image._id ? 'bg-blue-200' : ''"
           class="flex w-full py-3 hover:bg-blue-300 pl-5 transition-all items-center gap-2"
           @click="selectedImage = image"
      >
        <img :src="image.file_path" alt="img" class="h-20 w-20 rounded-2xl object-cover ">
        <span class="text-nowrap overflow-hidden text-xl">{{ image.file_name }}</span>
      </div>
    </div>
    <div class="w-3/4 flex flex-col items-center mt-5">
      <img :src="selectedImage.file_path" alt="img" class="h-[400px] rounded-2xl object-cover">
      <div class="w-full mx-auto">
        <div>
          <span>Position</span>
          <div>
            <span>X</span>
            <el-slider v-model="value" show-input style="width: 70%"/>
          </div>
          <div>
            <span>Y</span>
            <el-slider v-model="value" show-input style="width: 70%"/>
          </div>
        </div>
        <div>
          <span>Opacity</span>
          <el-slider v-model="value" show-input style="width: 70%"/>
        </div>
        <div>
          <span>Size</span>
          <el-input-number v-model="value" min="0" max="100" step="1"/>
        </div>
        <div>
          <span>Color</span>
          <el-color-picker v-model="color" show-alpha/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>