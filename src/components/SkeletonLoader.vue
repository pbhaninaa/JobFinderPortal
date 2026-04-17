<template>
  <div class="space-y-4">
    <div
      v-for="n in count"
      :key="n"
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-start gap-4 mb-3">
            <!-- Logo skeleton -->
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-200"></div>

            <div class="flex-1">
              <!-- Title skeleton -->
              <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <!-- Company skeleton -->
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          <!-- Location & Tags skeleton -->
          <div class="flex items-center gap-3 mb-3">
            <div class="h-4 bg-gray-200 rounded w-32"></div>
            <div class="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>

          <!-- Description skeleton -->
          <div class="space-y-2 mb-4">
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>

          <!-- Footer skeleton -->
          <div class="flex items-center gap-4">
            <div class="h-3 bg-gray-200 rounded w-24"></div>
            <div class="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <!-- Button skeleton -->
        <div class="flex-shrink-0">
          <div class="h-10 w-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 5
  }
});
</script>
