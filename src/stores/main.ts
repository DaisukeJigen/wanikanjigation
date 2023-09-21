import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const loading = ref(0)
  const isLoading = computed(() => loading.value > 0)
  function updateLoading(data: number) {
    loading.value = loading.value + data;
  }

  return { loading, isLoading, updateLoading }
})
