<script setup lang="ts">
import {ref} from 'vue';

const isDarkMode = ref(false);

function toggleDarkMode() {
  const html = document.documentElement;
  isDarkMode.value = !isDarkMode.value;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }
}
</script>

<template>
  <div class="h-full w-full">
    <div
        class="w-full h-12 flex bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-black items-center justify-between px-4 shadow-md transition-colors duration-500 ease-in-out relative">
      <span class="font-semibold text-xl text-white dark:text-gray-300 absolute left-1/2 transform -translate-x-1/2">
        Watermark for Image
      </span>
      <button
          @click="toggleDarkMode"
          class="absolute right-4 flex items-center justify-between px-1 py-1 w-16 h-8 bg-gradient-to-r from-yellow-300 to-yellow-500 dark:from-gray-600 dark:to-gray-800 rounded-full transition-all duration-700 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl"
      >
        <span
            class="absolute left-0 flex items-center justify-center w-7 h-7 bg-white text-yellow-500 dark:text-blue-300 rounded-full shadow-md transform transition-transform duration-700 ease-in-out"
            :class="{ 'translate-x-8 rotate-[360deg]': isDarkMode }">
          <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"
               fill="currentColor" class="animate-pulse">
            <path
                d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"
               fill="currentColor" class="glow-dark">
            <path
                d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
          </svg>
        </span>
      </button>
    </div>
    <RouterView class="h-[calc(100vh_-_48px)] w-screen mt-0"/>
  </div>
</template>

<style scoped>
button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
}

.glow-dark {
  filter: drop-shadow(0 0 10px #00c6ff);
}
</style>
