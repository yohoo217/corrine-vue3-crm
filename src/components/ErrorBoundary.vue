<!-- (dep)src/components/ErrorBoundary.vue -->
<template>
    <div>
      <slot v-if="!error"></slot>
      <div v-else>
        <h1>发生错误</h1>
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorBoundary',
    data() {
      return {
        error: null
      }
    },
    errorCaptured(err, vm, info) {
    console.error('Error captured by ErrorBoundary:', err, info)
    this.error = `${err.toString()}\nInfo: ${info}`
    return false
  }
  }
  </script>