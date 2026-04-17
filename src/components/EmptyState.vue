<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      {{ title || 'No jobs found' }}
    </h3>

    <p class="text-gray-600 text-center max-w-md mb-6">
      {{ message || 'Try adjusting your search criteria or filters to find more opportunities.' }}
    </p>

    <div v-if="showSuggestions" class="text-sm text-gray-500 text-center space-y-2">
      <p class="font-medium text-gray-700">Suggestions:</p>
      <ul class="space-y-1">
        <li>• Try different keywords or job titles</li>
        <li>• Expand your location search</li>
        <li>• Remove some filters</li>
        <li>• Check for spelling mistakes</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  showSuggestions: {
    type: Boolean,
    default: true
  }
});
</script>
