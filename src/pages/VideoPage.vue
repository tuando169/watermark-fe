<script setup lang="ts">
import {ref} from "vue";
import {apiEndpoints} from "@/apiEndpoints";
import type {Font, Image, WatermarkOptions} from "@/types";
import {ElNotification} from "element-plus";
import {axiosClient} from "@/axiosClient";
import axios from "axios";

const imageList = ref<Image[]>([]);
const fontList = ref<Font[]>([]);

const selectedImage = ref<Image | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const form = ref<WatermarkOptions>({
  type: 'text',
  font: '',
  color: '',
  content: '',
  opacity: 1.0,
  position_x: 0,
  position_y: 0,
  size: 15
});

fetchData()
getListFont()

async function fetchData() {
  const res = await axiosClient.get(apiEndpoints.mediaFile.getListVideo, {withCredentials: true});
  imageList.value = res.data;
}

async function getListFont() {
  const res = await axiosClient.get(apiEndpoints.mediaFile.font.getList, {withCredentials: true});
  fontList.value = res.data;
}


async function handleSave() {
  if (!selectedImage.value) {
    ElNotification({
      title: 'Error',
      message: 'No image selected',
      type: 'error',
    });
    return;
  }
  // Proceed with the rest of the code since `selectedImage.value` is guaranteed to exist
  const uploadData = new FormData();
  uploadData.set('type', form.value.type);
  uploadData.set('size', form.value.size.toString());
  uploadData.set('content', form.value.content);
  uploadData.set('color', form.value.color);
  uploadData.set('position_x', form.value.position_x.toString());
  uploadData.set('position_y', form.value.position_y.toString());
  uploadData.set('opacity', form.value.opacity.toString());

  try {
    await axiosClient.post(`${apiEndpoints.mediaFile.applyWatermark}/${selectedImage.value._id}`, uploadData);
    ElNotification({
      title: 'Success',
      message: 'Apply watermark successfully!',
      type: 'success',
    });
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Failed to apply watermark.',
      type: 'error',
    });
  }
}


async function addImage(event: Event) {
  const file = event.target as HTMLInputElement
  if (!file || !file.files || file.files.length === 0) return

  const uploadImage = file.files[0]
  if (!uploadImage) return
  const uploadData = new FormData()
  uploadData.set("file", uploadImage)
  const res = await axios.post(apiEndpoints.mediaFile.create, uploadData)
  if (res.status >= 200 && res.status < 300) {
    await fetchData()
    ElNotification({
      title: 'Success',
      message: 'Image added successfully!',
      type: 'success'
    })
  }

}


function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}


</script>

<template>
  <div class="p-4 sm:p-10 relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div
        class="absolute z-50 top-0 left-0 h-full w-[64px] sm:w-[88px] group hover:w-[200px] sm:hover:w-[250px] transition-all duration-300 bg-blue-500 dark:bg-gray-800 shadow-xl overflow-hidden">
      <div
          v-for="image in imageList"
          :key="image._id"
          :class="selectedImage && selectedImage?._id === image._id ? 'bg-blue-600 dark:bg-gray-700' : 'bg-blue-500 dark:bg-gray-800'"
          class="flex items-center gap-2 sm:gap-4 py-2 sm:pl-4 pl-3 sm:py-3 px-2 sm:px-4 hover:bg-blue-600 dark:hover:bg-gray-700 transition-all cursor-pointer group-hover:shadow-lg"
          @click="selectedImage = image"
      >
        <img :src="image.file_path" alt="img"
             class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-white dark:border-gray-100 group-hover:scale-110 transition-transform duration-200">
        <span class="text-sm sm:text-lg font-medium text-white dark:text-gray-200 truncate group-hover:block hidden">{{
            image.file_name
          }}</span>
      </div>
      <div
          class="flex items-center gap-2 sm:gap-4 py-2 sm:pl-4 pl-3 sm:py-3 px-2 sm:px-4 hover:bg-blue-600 dark:hover:bg-gray-700 transition-all cursor-pointer group-hover:shadow-lg"
          @click="triggerFileInput"
      >
        <svg
            class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-white dark:border-gray-100 group-hover:scale-110 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
        <span class="text-sm sm:text-lg font-medium text-white dark:text-gray-200 truncate group-hover:block hidden">Add Video</span>
        <input ref="fileInput" type="file" class="hidden" @change="addImage">
      </div>
    </div>

    <div
        class="h-full ml-[64px] sm:ml-[88px] transition-all duration-300 group-hover:ml-[200px] sm:group-hover:ml-[250px] flex-1 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div
          class="h-full gap-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center justify-center w-full sm:w-2/3">
        <!--        <div class="relative">-->
        <!--          <video src="/video.mp4" controls-->
        <!--                 class="rounded-lg object-contain shadow-md max-w-full sm:max-h-[35vh]">-->
        <!--          </video>-->
        <!--          <span class="absolute z-20"-->
        <!--                :style="{ color: form.color, opacity: form.opacity, fontSize: `${form.size}px`, top: `${form.position_y}px`, left: `${form.position_x}px`, fontFamily: form.font }"-->
        <!--          >    {{ form.content }}  </span>-->
        <!--        </div>-->
        <!--        <div class="relative">-->
        <!--          <video src="/video.mp4" controls-->
        <!--                 class="rounded-lg object-contain shadow-md max-w-full sm:max-h-[35vh]">-->
        <!--          </video>-->
        <!--        </div>-->
        <div class="relative">
          <video v-if="selectedImage" :src="selectedImage?.file_path" controls
                 class="rounded-lg object-contain shadow-md max-w-full sm:max-h-[35vh]">
          </video>
          <span class="absolute z-20"
                :style="{ color: form.color, opacity: form.opacity, fontSize: `${form.size}px`, top: `${form.position_y}px`, left: `${form.position_x}px`, fontFamily: form.font }"
          >    {{ form.content }}  </span>
        </div>
        <div class="relative">
          <video v-if="selectedImage" :src="selectedImage?.file_watermarked" src="/video.mp4" controls
                 class="rounded-lg object-contain shadow-md max-w-full sm:max-h-[35vh]">
          </video>
        </div>


      </div>

      <div
          class="w-full sm:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6 h-full flex flex-col justify-between">
        <h2 class="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-200">Edit Video</h2>

        <div class="space-y-4 sm:space-y-4 flex-grow">
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Content</label>
            <el-input v-model="form.content"
                      class="border-gray-300 dark:border-gray-600 py-1 sm:py-2 rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-gray-600"/>
          </div>
          <div class="flex gap-5">
            <div class="flex flex-col w-full">
              <label class="text-gray-700 dark:text-gray-200 font-bold">Font</label>
              <el-select v-model="form.font" placeholder="Select font">
                <!--                <el-option value="Arial, sans-serif" label="Arial, sans-serif"/>-->
                <!--                <el-option value="Roboto, sans-serif" label="Roboto, sans-serif"/>-->
                <el-option v-for="font in fontList" :value="font._id" :label="font.file_name"/>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label class="text-gray-700 dark:text-gray-200 font-bold">Color</label>
              <el-color-picker v-model="form.color" class="rounded-lg"/>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Position X</label>
            <el-slider v-model="form.position_x" :max="selectedImage?.width" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Position Y</label>
            <el-slider v-model="form.position_y" :max="selectedImage?.height" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Opacity</label>
            <el-slider v-model="form.opacity" :min="0" :max="1" :step="0.1" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Size</label>
            <el-slider v-model="form.size" show-input class="w-full"/>
          </div>
        </div>

        <div class="flex justify-end">
          <el-button type="primary" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                     @click="handleSave">
            Save
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
