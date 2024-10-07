<template>
  <div class="bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10">
    <div
        v-if="loading"
        class="flex justify-center items-center h-48 w-48">
      <div class="loader"></div>
    </div>
    <div
        v-else
        class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col sm:flex-row">
      <div
          class="sm:w-1/3 bg-gradient-to-b from-blue-600 to-blue-500 dark:from-gray-700 dark:to-gray-600 p-6 text-center flex flex-col items-center justify-center">
        <img
            :src="user.profile_picture"
            alt="User Avatar"
            class="w-28 h-28 rounded-full border-4 border-white dark:border-gray-500 shadow-lg object-cover mb-4"
        />
        <h2 class="text-xl font-semibold text-white">{{ user.username }}</h2>
        <p class="text-blue-200 dark:text-gray-300">{{ user.email }}</p>
      </div>

      <div class="sm:w-2/3 p-6 bg-white dark:bg-gray-800">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Profile Information</h3>
        <div class="mb-6">
          <label class="block text-gray-600 dark:text-gray-400 font-medium mb-2">Name</label>
          <input
              type="text"
              class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-300"
              v-model="user.username"
              disabled
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-600 dark:text-gray-400 font-medium mb-2">Email</label>
          <input
              type="text"
              class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-300"
              v-model="user.email"
              disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {axiosClient} from "@/axiosClient";
import {apiEndpoints} from "@/apiEndpoints";
import Cookies from "js-cookie";
import axios from "axios";

const user = ref({
  username: 'John Doe',
  email: 'johndoe@gmail.com',
  profile_picture: 'https://i.pravatar.cc/150?img=3'
});

const loading = ref(true); // Thêm trạng thái loading

axiosClient.get(apiEndpoints.auth.profile, {withCredentials: true})
    .then((res) => {
      user.value = {
        username: res.data.user.username,
        email: res.data.user.email,
        profile_picture: res.data.user.profile_picture
      };
      loading.value = false;
    });

</script>

<style scoped>
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
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
