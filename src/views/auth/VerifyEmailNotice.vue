<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { successToast, errorToast } from '@/utils/util-functions'

const route = useRoute()
const email = route.query.email

const loading = ref(false)

const resendEmail = async () => {
  try {
    loading.value = true

    const res = await axios.post('/auth/resend-verification-email', {
      email
    })

    if (res.data.status === 200) {
      successToast('Verification email sent again!')
    }
  } catch (err) {
    errorToast('Something went wrong')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-blue-100 p-4 rounded-full">
          📧
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Verify your email
      </h2>

      <!-- Message -->
      <p class="text-gray-600 mb-6">
        We've sent a verification link to
        <span class="font-semibold text-gray-800">{{ email }}</span>.
        Please check your inbox and click the link to activate your account.
      </p>

      <!-- Resend -->
      <button
        @click="resendEmail"
        :disabled="loading"
        class="w-full bg-main text-white py-3 rounded-lg font-semibold hover:bg-hover transition"
      >
        {{ loading ? 'Sending...' : 'Resend Email' }}
      </button>

      <!-- Hint -->
      <p class="text-sm text-gray-400 mt-4">
        Didn’t receive the email? Check spam folder.
      </p>

    </div>
  </section>
</template>