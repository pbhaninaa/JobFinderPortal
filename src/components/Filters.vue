<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6 sticky top-24">
    <div class="flex items-center justify-between pb-2 border-b border-gray-200">
      <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <svg class="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filters
      </h3>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors underline decoration-2 underline-offset-2"
      >
        Clear All
      </button>
    </div>

    <!-- Date Posted -->
    <div class="space-y-3">
      <button
        @click="toggleSection('datePosted')"
        class="w-full flex items-center justify-between text-left py-2 hover:text-primary-600 transition-colors"
      >
        <span class="text-base font-semibold text-gray-900">Date Posted</span>
        <svg
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.datePosted }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.datePosted" class="space-y-1.5 animate-fade-in pl-1">
        <label
          v-for="option in dateOptions"
          :key="option.value"
          class="flex items-center p-2.5 rounded-lg hover:bg-primary-50 cursor-pointer transition-all duration-150 group"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="localDatePosted"
            @change="handleDateChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- Employment Type -->
    <div class="space-y-3">
      <button
        @click="toggleSection('employmentType')"
        class="w-full flex items-center justify-between text-left py-2 hover:text-primary-600 transition-colors"
      >
        <span class="text-base font-semibold text-gray-900">Employment Type</span>
        <svg
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.employmentType }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.employmentType" class="space-y-1.5 animate-fade-in pl-1">
        <label
          v-for="option in employmentOptions"
          :key="option.value"
          class="flex items-center p-2.5 rounded-lg hover:bg-primary-50 cursor-pointer transition-all duration-150 group"
        >
          <input
            type="checkbox"
            :value="option.value"
            v-model="localEmploymentTypes"
            @change="handleEmploymentChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- Remote Work -->
    <div class="space-y-3">
      <button
        @click="toggleSection('remote')"
        class="w-full flex items-center justify-between text-left py-2 hover:text-primary-600 transition-colors"
      >
        <span class="text-base font-semibold text-gray-900">Work Location</span>
        <svg
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.remote }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.remote" class="animate-fade-in pl-1">
        <label class="flex items-center p-2.5 rounded-lg hover:bg-primary-50 cursor-pointer transition-all duration-150 group">
          <input
            type="checkbox"
            v-model="localRemoteOnly"
            @change="handleRemoteChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">Remote Only</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  datePosted: {
    type: String,
    default: 'all'
  },
  employmentTypes: {
    type: Array,
    default: () => []
  },
  remoteOnly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:datePosted', 'update:employmentTypes', 'update:remoteOnly', 'change']);

const localDatePosted = ref(props.datePosted);
const localEmploymentTypes = ref([...props.employmentTypes]);
const localRemoteOnly = ref(props.remoteOnly);

const expandedSections = ref({
  datePosted: true,
  employmentType: true,
  remote: true
});

const dateOptions = [
  { label: 'Any Time', value: 'all' },
  { label: 'Past 24 Hours', value: 'today' },
  { label: 'Past 3 Days', value: '3days' },
  { label: 'Past Week', value: 'week' },
  { label: 'Past Month', value: 'month' }
];

const employmentOptions = [
  { label: 'Full-time', value: 'FULLTIME' },
  { label: 'Part-time', value: 'PARTTIME' },
  { label: 'Contract', value: 'CONTRACTOR' },
  { label: 'Internship', value: 'INTERN' }
];

const hasActiveFilters = computed(() => {
  return localDatePosted.value !== 'all' ||
    localEmploymentTypes.value.length > 0 ||
    localRemoteOnly.value;
});

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

const handleDateChange = () => {
  emit('update:datePosted', localDatePosted.value);
  emit('change');
};

const handleEmploymentChange = () => {
  emit('update:employmentTypes', localEmploymentTypes.value);
  emit('change');
};

const handleRemoteChange = () => {
  emit('update:remoteOnly', localRemoteOnly.value);
  emit('change');
};

const clearFilters = () => {
  localDatePosted.value = 'all';
  localEmploymentTypes.value = [];
  localRemoteOnly.value = false;
  emit('update:datePosted', 'all');
  emit('update:employmentTypes', []);
  emit('update:remoteOnly', false);
  emit('change');
};

watch(() => props.datePosted, (newVal) => {
  localDatePosted.value = newVal;
});

watch(() => props.employmentTypes, (newVal) => {
  localEmploymentTypes.value = [...newVal];
});

watch(() => props.remoteOnly, (newVal) => {
  localRemoteOnly.value = newVal;
});
</script>
