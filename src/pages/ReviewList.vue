<template>
  <div class="review-list">
    <section class="latest-posts">
      <h2>All Reviews</h2>
      <div class="divider"></div>
      
      <div class="filters" v-if="categories.length > 0">
        <button 
          @click="selectedCategory = ''" 
          :class="{ active: selectedCategory === '' }"
        >All</button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.name"
          :class="{ active: selectedCategory === cat.name }"
        >{{ cat.name }}</button>
      </div>

      <div class="posts-grid">
        <article v-for="review in paginatedReviews" :key="review.id" class="post-card">
          <div class="post-image">
            <img :src="review.imageUrl" :alt="review.title">
          </div>
          <div class="post-content">
            <div class="post-meta-inline">
              <time>{{ formatDate(review.createdAt) }}</time>
              <StarRating :rating="review.rating" />
            </div>
            <h3>
              <router-link :to="'/reviews/' + review.id">{{ review.title }}</router-link>
            </h3>
            <p>{{ review.excerpt }}</p>
            <router-link :to="'/reviews/' + review.id" class="read-more">Read More →</router-link>
          </div>
        </article>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button 
          :disabled="currentPage === 1" 
          @click="currentPage--"
          class="page-btn"
        >
          &larr; Previous
        </button>
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages" 
          @click="currentPage++"
          class="page-btn"
        >
          Next &rarr;
        </button>
      </div>
      
      <div v-if="allReviews.length === 0" class="no-results">
        <p>No reviews found for this category.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import StarRating from '../components/StarRating.vue'
import { formatDate } from '../utils/dateUtils'

useHead({
  title: 'All Book Reviews | Warm Tea & Honest Reviews',
  meta: [
    {
      name: 'description',
      content: 'Browse our complete collection of book reviews. Filter by category to find your next favorite read.'
    },
    {
      property: 'og:title',
      content: 'All Book Reviews'
    },
    {
      property: 'og:description',
      content: 'Browse our complete collection of book reviews.'
    }
  ]
})

interface Review {
  id: string
  slug: string
  title: string
  author: string
  rating: number
  page: number
  language: string
  categories: string[]
  publishedAt: string
  createdAt: string
  excerpt: string
  imageUrl: string
}

interface Category {
  id: string
  name: string
  createdAt: string
}

const route = useRoute()
const allReviews = ref<Review[]>([])
const totalReviews = ref(0)
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = 6

const categories = ref<Category[]>([])

const fetchReviews = async () => {
  try {
    const page = currentPage.value - 1
    const offset = pageSize // offset seems to be used as limit/pageSize in the provided spec
    let url = `/api/reviews?page=${page}&offset=${offset}`
    
    if (selectedCategory.value) {
      url += `&category=${encodeURIComponent(selectedCategory.value)}`
    }
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch reviews from API')
    const data = await response.json()
    allReviews.value = data.reviews
    console.log(allReviews.value.values())
    totalReviews.value = data.total
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

const totalPages = computed(() => {
  return Math.ceil(totalReviews.value / pageSize)
})

const paginatedReviews = computed(() => {
  return allReviews.value
})

watch(currentPage, () => {
  fetchReviews()
})

watch(selectedCategory, () => {
  currentPage.value = 1
  fetchReviews()
})

onMounted(async () => {
  try {
    // Fetch categories from API
    const catResponse = await fetch('/api/categories')
    if (!catResponse.ok) throw new Error('Failed to fetch categories from API')
    const catData = await catResponse.json()
    categories.value = catData.categories

    // Fetch initial reviews from API
    await fetchReviews()
    
    // Set initial category from query param
    if (route.query.category) {
      selectedCategory.value = route.query.category as string
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

watch(() => route.query.category, (newCat) => {
  if (newCat) {
    selectedCategory.value = newCat as string
  } else {
    selectedCategory.value = ''
  }
})
</script>

<style scoped>
.review-list {
  padding-top: 40px;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.filters button {
  background: none;
  border: 1px solid #ddd;
  padding: 8px 20px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.filters button.active, .filters button:hover {
  background: #333;
  color: #fff;
  border-color: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.page-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.page-btn:hover:not(:disabled) {
  background: #333;
  color: #fff;
  border-color: #333;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

.no-results {
  text-align: center;
  margin: 100px 0;
  color: #888;
}
</style>
