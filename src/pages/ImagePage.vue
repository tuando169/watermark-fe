<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {apiEndpoints} from "@/apiEndpoints";
import type {Image, WatermarkOptions} from "@/types";
import {ElNotification} from 'element-plus'

const imageList = ref<Image>([])
const selectedImage = ref<Image>({})
const form = ref<WatermarkOptions>({
  type: 'text',
  color: '',
  content: '',
  opacity: 0,
  position_x: 0,
  position_y: 0,
  size: 0
})

fetchData()

async function fetchData() {
  const res = await axios.get(apiEndpoints.mediaFile.getList)
  imageList.value = res.data
}

async function handleSave() {
  const uploadData = new FormData()
  uploadData.set('type', 'text')
  uploadData.set('size', form.value.size)
  uploadData.set('content', form.value.content)
  uploadData.set('color', form.value.color)
  uploadData.set('position_x', form.value.position_x)
  uploadData.set('position_y', form.value.position_y)
  uploadData.set('opacity', 0.5)

  await axios.post(apiEndpoints.mediaFile.applyWatermark + selectedImage.value._id, uploadData)
  ElNotification({
    title: 'Success',
    message: 'Apply watermark successfully!',
    type: 'success',
  })
}
</script>

<template>
  <div class="h-full w-full flex">
    <div class="w-1/4 h-[calc(100vh_-_40px)]">
      <div v-for="image in imageList" :key="image.id"
           :class="selectedImage._id == image._id ? 'bg-blue-200' : ''"
           class="flex w-full py-3 hover:bg-blue-300 pl-5 transition-all items-center gap-2 cursor-pointer"
           @click="selectedImage = image"
      >
        <img :src="image.file_path" alt="img" class="h-20 w-20 rounded-2xl object-cover ">
        <span class="text-nowrap overflow-hidden text-xl">{{ image.file_name }}</span>
      </div>
    </div>
    <div class="w-3/4 flex flex-col items-center bg-gray-100">
      <img :src="selectedImage.file_path" alt="img" class="h-[400px] rounded-2xl object-cover mt-5">
      <div class="w-full px-20 pt-5">
        <div class="flex items-center w-full gap-10 mb-5">
          <div class="flex gap-5 w-[76%]">
            <span>Content</span>
            <el-input v-model="form.content"/>
          </div>
          <div class="flex gap-5">
            <span>Color</span>
            <el-color-picker v-model="form.color"/>
          </div>
        </div>
        <div class="flex w-full items-center mb-5">
          <span>Position</span>
          <div class="w-full ml-3">
            <div class="w-[90%] flex items-center gap-5 mb-3">
              <span>X</span>
              <el-slider v-model="form.position_x" show-input/>
            </div>
            <div class="w-[90%] flex items-center gap-5">
              <span>Y</span>
              <el-slider v-model="form.position_y" show-input/>
            </div>
          </div>
        </div>
        <div class="flex w-full items-center gap-5">
          <div class="w-1/2 flex items-center gap-5">
            <span>Opacity</span>
            <el-slider v-model="form.opacity" show-input style="width: 70%"/>
          </div>
          <div class="w-1/2 flex items-center gap-5">
            <span>Size</span>
            <el-slider v-model="form.size" show-input style="width: 70%"/>
          </div>
        </div>
        <div class="flex w-full">
          <el-button type="primary" class="ml-auto" @click="handleSave">Save</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>