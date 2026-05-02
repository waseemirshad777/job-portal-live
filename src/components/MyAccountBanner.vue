<script setup>
import { useAuthStore } from '@/store/authStore';
const store = useAuthStore();
</script>

<template>
    <div class="bg-main2 rounded-lg w-full h-72 bg-center bg-cover relative" style="background-image: url('/images/9.jpg');">
      <div class="profile-pic absolute" >
        <div class="bg-gray-400 overflow-hidden rounded-lg w-20 h-20 flex items-center justify-center">
          <img v-if="store.user.profilePhoto" :src="store.user.profilePhoto" alt="">
          <img v-else src="/images/avatar.jpg" alt="">
        </div>
        <p class="text-center font-semibold mt-3">{{ store.user.username }}</p>
      </div>
    </div>
</template>

<style scoped>
.profile-pic {
    left: 20px;
    bottom: -70px;
}
</style>