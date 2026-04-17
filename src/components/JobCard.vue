<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-primary-300 p-6 transition-all duration-300 cursor-pointer group animate-slide-up"
    @click="openJobLink"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <!-- Company Logo & Title -->
        <div class="flex items-start gap-4 mb-3">
          <div
            v-if="job.employer_logo"
            class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
          >
            <img
              :src="job.employer_logo"
              :alt="job.employer_name"
              class="w-full h-full object-contain"
              @error="hideImage"
            />
          </div>
          <div
            v-else
            class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center"
          >
            <span class="text-white font-semibold text-lg">
              {{ job.employer_name?.charAt(0) || 'J' }}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
              {{ job.job_title }}
            </h3>
            <p class="text-sm font-medium text-gray-700">
              {{ job.employer_name }}
            </p>
          </div>
        </div>

        <!-- Location & Employment Type -->
        <div class="flex flex-wrap items-center gap-3 mb-3">
          <div v-if="job.job_city || job.job_country" class="flex items-center text-sm text-gray-600">
            <svg class="h-4 w-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ formatLocation(job) }}
          </div>

          <div v-if="job.job_employment_type" class="flex items-center">
            <span class="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
              {{ formatEmploymentType(job.job_employment_type) }}
            </span>
          </div>

          <div v-if="job.job_is_remote" class="flex items-center">
            <span class="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Remote
            </span>
          </div>
        </div>

        <!-- Job Description Preview -->
        <p class="text-sm text-gray-600 line-clamp-2 mb-4">
          {{ job.job_description || 'No description available.' }}
        </p>

        <!-- Posted Date & Salary -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <div v-if="job.job_posted_at_datetime_utc" class="flex items-center">
            <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatDate(job.job_posted_at_datetime_utc) }}
          </div>

          <div v-if="job.job_min_salary && job.job_max_salary" class="flex items-center font-medium text-gray-700">
            <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatSalary(job) }}
          </div>
        </div>
      </div>

      <!-- Apply Button -->
      <div class="flex-shrink-0">
        <button
          @click.stop="openJobLink"
          class="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow group-hover:scale-105"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const showLogo = ref(true);

const hideImage = () => {
  showLogo.value = false;
};

const formatLocation = (job) => {
  const parts = [];
  if (job.job_city) parts.push(job.job_city);
  if (job.job_state) parts.push(job.job_state);
  if (job.job_country) parts.push(job.job_country);
  return parts.join(', ') || 'Location not specified';
};

const formatEmploymentType = (type) => {
  const types = {
    'FULLTIME': 'Full-time',
    'PARTTIME': 'Part-time',
    'CONTRACTOR': 'Contract',
    'INTERN': 'Internship'
  };
  return types[type] || type;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const formatSalary = (job) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const min = formatNumber(job.job_min_salary);
  const max = formatNumber(job.job_max_salary);
  const currency = job.job_salary_currency || 'USD';
  const period = job.job_salary_period || 'YEAR';

  return `${currency} ${min} - ${max}/${period.toLowerCase()}`;
};

const openJobLink = () => {
  if (props.job.job_apply_link) {
    window.open(props.job.job_apply_link, '_blank', 'noopener,noreferrer');
  }
};
</script>
