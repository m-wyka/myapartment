<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: "bg-white dark:bg-gray-900 dark:text-white",
  },
});
</script>

<template>
  <main class="flex h-screen">
    <div class="flex-1 p-4">
      <slot />
    </div>
  </main>
</template>
