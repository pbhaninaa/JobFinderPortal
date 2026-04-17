<template>
  <div >
    <div class="glassmorphism rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr,1fr,auto] gap-4 md:gap-5 items-end">
        <!-- Job Title / Keywords -->
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">
            Job Title or Keywords
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              v-model="localQuery"
              @input="handleQueryInput"
              @keypress.enter="handleSearch"
              placeholder="e.g. Software Developer"
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 bg-white hover:border-gray-400 text-base"
            />
          </div>
        </div>

        <!-- Location -->
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">
            Location
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              v-model="localLocation"
              @input="handleLocationInput"
              @keypress.enter="handleSearch"
              placeholder="e.g. Durban, Gauteng"
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 bg-white hover:border-gray-400 text-base"
            />
          </div>
        </div>

        <!-- Search Button -->
        <button
          @click="handleSearch"
          :disabled="!localQuery.trim()"
          class="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 flex items-center justify-center gap-2 min-h-[56px] lg:min-h-[60px] whitespace-nowrap"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="text-base">Search Jobs</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  query: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:query', 'update:location', 'search']);

const localQuery = ref(props.query);
const localLocation = ref(props.location);

let queryTimeout = null;
let locationTimeout = null;

const handleQueryInput = () => {
  clearTimeout(queryTimeout);
  queryTimeout = setTimeout(() => {
    emit('update:query', localQuery.value);
  }, 300);
};

const handleLocationInput = () => {
  clearTimeout(locationTimeout);
  locationTimeout = setTimeout(() => {
    emit('update:location', localLocation.value);
  }, 300);
};

const handleSearch = () => {
  emit('search');
};

watch(() => props.query, (newVal) => {
  localQuery.value = newVal;
});

watch(() => props.location, (newVal) => {
  localLocation.value = newVal;
});
</script>
