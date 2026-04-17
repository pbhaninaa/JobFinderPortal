<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
      >
        Clear All
      </button>
    </div>

    <!-- Date Posted -->
    <div class="space-y-3">
      <button
        @click="toggleSection('datePosted')"
        class="w-full flex items-center justify-between text-left"
      >
        <span class="text-sm font-medium text-gray-900">Date Posted</span>
        <svg
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.datePosted }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.datePosted" class="space-y-2 animate-fade-in">
        <label
          v-for="option in dateOptions"
          :key="option.value"
          class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="localDatePosted"
            @change="handleDateChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- Employment Type -->
    <div class="space-y-3">
      <button
        @click="toggleSection('employmentType')"
        class="w-full flex items-center justify-between text-left"
      >
        <span class="text-sm font-medium text-gray-900">Employment Type</span>
        <svg
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.employmentType }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.employmentType" class="space-y-2 animate-fade-in">
        <label
          v-for="option in employmentOptions"
          :key="option.value"
          class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
        >
          <input
            type="checkbox"
            :value="option.value"
            v-model="localEmploymentTypes"
            @change="handleEmploymentChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <div class="border-t border-gray-200"></div>

    <!-- Remote Work -->
    <div class="space-y-3">
      <button
        @click="toggleSection('remote')"
        class="w-full flex items-center justify-between text-left"
      >
        <span class="text-sm font-medium text-gray-900">Work Location</span>
        <svg
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': expandedSections.remote }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="expandedSections.remote" class="animate-fade-in">
        <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
          <input
            type="checkbox"
            v-model="localRemoteOnly"
            @change="handleRemoteChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
          />
          <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">Remote Only</span>
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
