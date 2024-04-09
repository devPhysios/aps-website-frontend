<template>
    <section class="flex flex-col gap-2 items-center justify-center w-full h-[69.5vh] font-display">
        <div class="spinner"></div>
        <h1 class="text-2xl">Coming Soon!!!</h1>
    </section>
</template>

<style scoped>
.spinner {
  border: 10px solid #4caf50;
  border-top-color: #ff9800;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>