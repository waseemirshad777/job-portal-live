<template>
    <h1>Hello World</h1>
    <div>
    <button @click="showToast">Show Toast</button>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toast-notification';

const toast = useToast();

    const showToast = () => {
      toast.open({
        message: 'Hello, this is a toast notification!',
        type: 'success', // You can choose 'success', 'error', 'info', or 'warning'
        position: 'top-right', // You can choose 'top-right', 'top', 'top-left', 'bottom-right', 'bottom', or 'bottom-left'
      });
    };

</script>