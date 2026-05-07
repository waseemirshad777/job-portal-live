<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { successToast, errorToast } from '@/utils/util-functions'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const success = ref(false)

const verifyEmail = async () => {
  try {
    const token = route.query.token

    const res = await axios.post('/auth/verify-email', {
      token
    })

    if (res.data.status === 200) {
      success.value = true
      successToast('Email verified successfully!')

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (err) {
    errorToast('Invalid or expired token')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  verifyEmail()
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

      <!-- Loading -->
      <div v-if="loading">
        <p class="text-gray-600">Verifying your email...</p>
      </div>

      <!-- Success -->
      <div v-else-if="success">
        <div class="text-green-500 text-5xl mb-4">✔</div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">
          Email Verified!
        </h2>
        <p class="text-gray-600">
          Redirecting to your account...
        </p>
      </div>

      <!-- Error -->
      <div v-else>
        <div class="text-red-500 text-5xl mb-4">✖</div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">
          Verification Failed
        </h2>
        <p class="text-gray-600">
          The link is invalid or expired.
        </p>
      </div>

    </div>
  </section>
</template>