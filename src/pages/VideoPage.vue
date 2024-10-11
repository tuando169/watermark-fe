<script setup lang="ts">
import {ref} from "vue";
import {apiEndpoints} from "@/apiEndpoints";
import type {Font, MediaFile, WatermarkOptions} from "@/types";
import {ElLoading, ElMessageBox, ElNotification} from "element-plus";
import {axiosClient} from "@/axiosClient";
import axios from "axios";

const videoList = ref<MediaFile[]>([]);
const fontList = ref<Font[]>([]);
const videoRatio = ref(1)
const selectedVideo = ref<MediaFile | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const loading = ref(true)
const form = ref<WatermarkOptions>({
  type: 'text',
  font: '',
  color: '#FFFFFF',
  content: '',
  opacity: 1.0,
  position_x: 0,
  position_y: 0,
  size: 15
})
const displayVideo = ref<any>(null)
fetchData()
getListFont()

async function fetchData() {
  const res = await axiosClient.get(apiEndpoints.mediaFile.getListVideo, {withCredentials: true});
  videoList.value = res.data;
  loading.value = false;
}

async function getListFont() {
  const res = await axiosClient.get(apiEndpoints.mediaFile.font.getList, {withCredentials: true});
  fontList.value = res.data;
}


async function handleSave() {
  if (!selectedVideo.value) {
    ElNotification({
      title: 'Error',
      message: 'No video selected',
      type: 'error',
    });
    return;
  }
  if (!form.value.content || !form.value.font) {
    ElNotification({
      title: 'Error',
      message: 'Please fill in the required fields',
      type: 'error',
    })
  }

  const loading = ElLoading.service({text: 'Loading'})
  const fontId = fontList.value.find(font => font.title === form.value.font)?._id;
  const uploadData = new FormData();
  uploadData.set('type', form.value.type);
  uploadData.set('size', form.value.size.toString());
  uploadData.set('content', form.value.content);
  uploadData.set('color', form.value.color);
  uploadData.set('position_x', form.value.position_x.toString());
  uploadData.set('position_y', form.value.position_y.toString());
  uploadData.set('opacity', form.value.opacity.toString());
  if (fontId) uploadData.set('font', fontId);
  try {
    await axiosClient.post(`${apiEndpoints.mediaFile.applyWatermark}/${selectedVideo.value._id}`, uploadData);
    await fetchData()
    selectedVideo.value = videoList.value.find(video => video._id === selectedVideo.value._id)
    loading.close()
    ElNotification({
      title: 'Success',
      message: 'Apply watermark successfully!',
      type: 'success',
    });
  } catch (error) {
    loading.close()
    ElNotification({
      title: 'Error',
      message: 'Failed to apply watermark.',
      type: 'error',
    });
  }
}


async function addVideo(event: Event) {
  const file = event.target as HTMLInputElement
  if (!file || !file.files || file.files.length === 0) return

  const uploadVideo = file.files[0]
  if (!uploadVideo) return
  const uploadData = new FormData()
  uploadData.set("file", uploadVideo)
  const res = await axios.post(apiEndpoints.mediaFile.create, uploadData)
  if (res.status >= 200 && res.status < 300) {
    await fetchData()
    ElNotification({
      title: 'Success',
      message: 'Video added successfully!',
      type: 'success'
    })
  }

}


function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function selectVideo(video: MediaFile) {
  selectedVideo.value = video
  if (selectedVideo.value)
    videoRatio.value = selectedVideo.value.height / (window.innerHeight * 0.38)
}

function deleteVideo(id: string) {
  ElMessageBox.confirm(
      'Are you sure you want to delete this video?',
      'Warning',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      }
  )
      .then(() => {
        axiosClient
            .delete(`${apiEndpoints.mediaFile.delete}/${id}`)
            .then(() => {
              ElNotification({
                title: 'Success',
                message: 'Video deleted successfully!',
                type: 'success',
              });
              selectedVideo.value = null;
              form.value = {
                type: 'text',
                font: '',
                color: '#FFFFFF',
                content: '',
                opacity: 1.0,
                position_x: 0,
                position_y: 0,
                size: 15
              }
              fetchData();
            })
            .catch((error) => {
              ElNotification({
                title: 'Error',
                message: 'Failed to delete the video. Please try again.',
                type: 'error',
              });
            });
      })

}

function onVideoLoad() {
  if (displayVideo.value && selectedVideo.value && selectedVideo.value.height) {
    const naturalHeight = selectedVideo.value.height;
    const displayedHeight = displayVideo.value.clientHeight;

    if (displayedHeight) {
      videoRatio.value = naturalHeight / displayedHeight;
    }
  }
}

</script>

<template>
  <div class="p-4 lg:p-10 relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div v-show="loading" class="flex justify-center items-center h-[70vh]">
      <div class="loader"></div>
    </div>
    <div v-show="!loading"
         class="absolute z-50 top-0 left-0 h-full w-[64px] lg:w-[88px] group hover:w-[200px] lg:hover:w-[250px] transition-all duration-300 bg-blue-500 dark:bg-gray-800 shadow-xl overflow-hidden">
      <div
          v-for="video in videoList"
          :key="video._id"
          :class="selectedVideo && selectedVideo?._id === video._id ? 'bg-blue-600 dark:bg-gray-700' : 'bg-blue-500 dark:bg-gray-800'"
          class="flex items-center gap-2 lg:gap-4 py-2 lg:pl-4 pl-3 lg:py-3 px-2 lg:px-4 hover:bg-blue-600 dark:hover:bg-gray-700 transition-all cursor-pointer group-hover:shadow-lg"
          @click="selectVideo(video)"
      >
        <video :src="video.file_path"
               class="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-white dark:border-gray-100 group-hover:scale-110 transition-transform duration-200">
        </video>
        <span class="text-sm lg:text-lg font-medium text-white dark:text-gray-200 truncate group-hover:block hidden">{{
            video.file_name
          }}</span>
        <span @click="deleteVideo(video._id)"
              class="p-3 rounded-full group-hover:block hidden bg-red-400 dark:bg-gray-800 text-white dark:text-gray-100 hover:bg-red-500 dark:hover:bg-gray-700 transition-all cursor-pointer">
          <svg
              class="transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-12"
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#fff">
          <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
        </span>
      </div>
      <div
          class="flex items-center gap-2 lg:gap-4 py-2 lg:pl-4 pl-3 lg:py-3 px-2 lg:px-4 hover:bg-blue-600 dark:hover:bg-gray-700 transition-all cursor-pointer group-hover:shadow-lg"
          @click="triggerFileInput"
      >
        <svg
            class="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-white dark:border-gray-100 group-hover:scale-110 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
        <span class="text-sm lg:text-lg font-medium text-white dark:text-gray-200 truncate group-hover:block hidden">Add Video</span>
        <input ref="fileInput" type="file" class="hidden" @change="addVideo">
      </div>
    </div>

    <div v-show="!loading"
         class="h-full ml-[64px] lg:ml-[88px] transition-all duration-300 group-hover:ml-[200px] lg:group-hover:ml-[250px] flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8">
      <div
          class="h-full gap-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6 flex flex-col items-center justify-center w-full lg:w-2/3">
        <div class="relative">
          <video v-if="selectedVideo" :src="selectedVideo?.file_path" controls
                 ref="displayVideo"
                 class="rounded-lg object-contain shadow-md max-w-full lg:max-h-[38vh]"
                 @loadedmetadata="onVideoLoad"
          >
          </video>
          <span class="absolute z-20"
                :style="{ color: form.color, opacity: form.opacity, fontSize: `${form.size / videoRatio}px`, top: `${form.position_y/videoRatio}px`, left: `${form.position_x/videoRatio}px`, fontFamily: form.font }"
          >    {{ form.content }}  </span>
        </div>
        <div class="relative">
          <video v-if="selectedVideo?.file_watermarked" :src="selectedVideo?.file_watermarked" controls
                 class="rounded-lg object-contain shadow-md max-w-full lg:max-h-[38vh]">
          </video>
        </div>


      </div>

      <div
          class="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6 space-y-4 lg:space-y-6 h-full flex flex-col justify-between">
        <h2 class="text-lg lg:text-xl font-bold text-gray-700 dark:text-gray-200">Edit Video</h2>

        <div class="space-y-4 lg:space-y-4 flex-grow">
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Content</label>
            <el-input v-model="form.content"
                      class="border-gray-300 dark:border-gray-600 py-1 lg:py-2 rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-gray-600"/>
          </div>
          <div class="flex gap-5">
            <div class="flex flex-col w-full">
              <label class="text-gray-700 dark:text-gray-200 font-bold">Font</label>
              <el-select v-model="form.font" placeholder="Select font">
                <el-option v-for="font in fontList" :value="font.title" :label="font.title"/>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label class="text-gray-700 dark:text-gray-200 font-bold">Color</label>
              <el-color-picker v-model="form.color" class="rounded-lg"/>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Position X</label>
            <el-slider v-model="form.position_x" :max="selectedVideo?.width" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Position Y</label>
            <el-slider v-model="form.position_y" :max="selectedVideo?.height" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Opacity</label>
            <el-slider v-model="form.opacity" :min="0" :max="1" :step="0.1" show-input class="w-full"/>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 dark:text-gray-200 font-bold">Size</label>
            <el-slider v-model="form.size" :max="1000" show-input class="w-full"/>
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
.loader {
  border: 8px solid rgba(243, 243, 243, 0.4); /* Light transparent border */
  border-top: 8px solid #3498db; /* Blue color for the top */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.2s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
