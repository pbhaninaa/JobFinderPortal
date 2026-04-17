<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              JobFinder
            </h1>
          </div>
          <div class="text-sm text-gray-600">
            <span v-if="totalJobs > 0" class="font-medium">{{ totalJobs.toLocaleString() }} jobs available</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Search Section -->
      <section class="mb-8">
        <div class="text-center mb-8">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of opportunities from top companies worldwide
          </p>
        </div>

        <SearchBar
          v-model:query="searchParams.query"
          v-model:location="searchParams.location"
          @search="handleSearch"
        />
      </section>

      <!-- Mobile Filters Toggle -->
      <div class="lg:hidden mb-4">
        <button
          @click="showMobileFilters = !showMobileFilters"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
          <span v-if="activeFiltersCount > 0" class="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
            {{ activeFiltersCount }}
          </span>
        </button>
      </div>

      <!-- Mobile Filters Drawer -->
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showMobileFilters"
          class="fixed inset-0 bg-black/50 z-40 lg:hidden"
          @click="showMobileFilters = false"
        >
          <transition
            enter-active-class="transition-transform duration-300"
            leave-active-class="transition-transform duration-300"
            enter-from-class="translate-x-full"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="showMobileFilters"
              class="absolute right-0 top-0 h-full w-80 max-w-full bg-gray-50 shadow-2xl overflow-y-auto"
              @click.stop
            >
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    @click="showMobileFilters = false"
                    class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Filters
                  v-model:date-posted="searchParams.datePosted"
                  v-model:employment-types="searchParams.employmentTypes"
                  v-model:remote-only="searchParams.remoteOnly"
                  @change="handleFilterChange"
                />
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <!-- Results Section with Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Desktop Filters Sidebar -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <Filters
              v-model:date-posted="searchParams.datePosted"
              v-model:employment-types="searchParams.employmentTypes"
              v-model:remote-only="searchParams.remoteOnly"
              @change="handleFilterChange"
            />
          </div>
        </aside>

        <!-- Jobs List -->
        <div class="lg:col-span-3">
          <!-- Error State -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
            <p class="text-red-700 mb-4">{{ error }}</p>
            <button
              @click="fetchJobs"
              class="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- Loading State -->
          <SkeletonLoader v-else-if="loading" :count="6" />

          <!-- Empty State -->
          <EmptyState
            v-else-if="!loading && jobs.length === 0"
            title="No jobs found"
            message="Try adjusting your search criteria or filters to find more opportunities."
            :show-suggestions="true"
          />

          <!-- Jobs Grid -->
          <div v-else class="space-y-4">
            <JobCard
              v-for="job in jobs"
              :key="job.job_id"
              :job="job"
            />

            <!-- Load More Button -->
            <div v-if="hasMoreJobs" class="flex justify-center pt-6">
              <button
                @click="loadMore"
                :disabled="loading"
                class="px-8 py-3.5 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                {{ loading ? 'Loading...' : 'Load More Jobs' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-16 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-sm text-gray-600">
          <p>&copy; 2025 JobFinder. Powered by JSearch API</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import SearchBar from './components/SearchBar.vue';
import Filters from './components/Filters.vue';
import JobCard from './components/JobCard.vue';
import SkeletonLoader from './components/SkeletonLoader.vue';
import EmptyState from './components/EmptyState.vue';

// State
const jobs = ref([]);
const loading = ref(false);
const error = ref(null);
const totalJobs = ref(0);
const currentPage = ref(1);
const hasMoreJobs = ref(true);
const showMobileFilters = ref(false);

const searchParams = ref({
  query: '',
  location: '',
  datePosted: 'all',
  employmentTypes: [],
  remoteOnly: false,
  country: 'ZA',
  language: 'en'
});

// Computed
const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchParams.value.datePosted !== 'all') count++;
  if (searchParams.value.employmentTypes.length > 0) count++;
  if (searchParams.value.remoteOnly) count++;
  return count;
});

// API URL - for development, use Vercel dev server; for production, use relative path
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api/jobs';
  }
  return '/api/jobs';
};

// Methods
const fetchJobs = async (reset = false) => {
  if (!searchParams.value.query.trim()) {
    searchParams.value.query = 'software developer jobs in South Africa';
  }

  if (reset) {
    currentPage.value = 1;
    jobs.value = [];
  }

  loading.value = true;
  error.value = null;

  try {
    const params = new URLSearchParams({
      query: searchParams.value.query,
      page: currentPage.value.toString(),
      num_pages: '1',
      country: searchParams.value.country,
      language: searchParams.value.language,
      date_posted: searchParams.value.datePosted,
    });

    if (searchParams.value.location.trim()) {
      params.append('location', searchParams.value.location);
    }

    if (searchParams.value.employmentTypes.length > 0) {
      params.append('employment_types', searchParams.value.employmentTypes.join(','));
    }

    if (searchParams.value.remoteOnly) {
      params.append('work_from_home', 'true');
    }

    const response = await fetch(`${getApiUrl()}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    const data = await response.json();

    if (reset) {
      jobs.value = data.data || [];
    } else {
      jobs.value = [...jobs.value, ...(data.data || [])];
    }

    totalJobs.value = data.num_results || 0;
    hasMoreJobs.value = (data.data || []).length === 10;
  } catch (err) {
    error.value = err.message || 'Failed to fetch jobs. Please try again.';
    console.error('Error fetching jobs:', err);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  showMobileFilters.value = false;
  fetchJobs(true);
  saveSearchToLocalStorage();
};

const handleFilterChange = () => {
  fetchJobs(true);
  saveSearchToLocalStorage();
};

const loadMore = () => {
  currentPage.value++;
  fetchJobs(false);
};

const saveSearchToLocalStorage = () => {
  try {
    localStorage.setItem('lastSearch', JSON.stringify(searchParams.value));
  } catch (err) {
    console.error('Failed to save search to localStorage:', err);
  }
};

const loadSearchFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('lastSearch');
    if (saved) {
      const parsed = JSON.parse(saved);
      searchParams.value = { ...searchParams.value, ...parsed };
    }
  } catch (err) {
    console.error('Failed to load search from localStorage:', err);
  }
};

// Lifecycle
onMounted(() => {
  loadSearchFromLocalStorage();
  fetchJobs(true);
});
</script>
