<template>
  <div class="h-full w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col sm:flex-row">
      <!-- Left Column: Avatar and Basic Info -->
      <div class="sm:w-1/3 bg-gradient-to-b from-blue-600 to-blue-500 dark:from-gray-700 dark:to-gray-600 p-6 text-center flex flex-col items-center justify-center">
        <img
            :src="user.avatar"
            alt="User Avatar"
            class="w-28 h-28 rounded-full border-4 border-white dark:border-gray-500 shadow-lg object-cover mb-4"
        />
        <h2 class="text-xl font-semibold text-white">{{ user.name }}</h2>
        <p class="text-blue-200 dark:text-gray-300">{{ user.email }}</p>
      </div>

      <!-- Right Column: Profile Details -->
      <div class="sm:w-2/3 p-6 bg-white dark:bg-gray-800">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Profile Information</h3>

        <!-- Name Field -->
        <div class="mb-6">
          <label class="block text-gray-600 dark:text-gray-400 font-medium mb-2">Name</label>
          <input
              type="text"
              class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-300"
              v-model="user.name"
              disabled
          />
        </div>

        <!-- Email Field -->
        <div class="mb-6">
          <label class="block text-gray-600 dark:text-gray-400 font-medium mb-2">Email</label>
          <input
              type="text"
              class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-300"
              v-model="user.email"
              disabled
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 mt-6">
          <button
              @click="editProfile"
              class="bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Edit Profile
          </button>
          <button
              @click="saveChanges"
              class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Thông tin người dùng (dữ liệu mẫu)
const user = ref({
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=3' // Link ảnh avatar mẫu
})

// Hàm chỉnh sửa hồ sơ
const editProfile = () => {
  alert('Editing Profile...')
}

// Hàm lưu thay đổi
const saveChanges = () => {
  alert('Profile changes saved!')
}
</script>

<style scoped>
/* CSS tùy chỉnh thêm nếu cần */
</style>
