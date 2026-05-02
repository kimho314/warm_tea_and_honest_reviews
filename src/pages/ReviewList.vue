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
          :key="cat"
          @click="selectedCategory = cat"
          :class="{ active: selectedCategory === cat }"
        >{{ cat }}</button>
      </div>

      <div class="posts-grid">
        <article v-for="review in paginatedReviews" :key="review.slug" class="post-card">
          <div class="post-image">
            <img :src="'/covers/' + review.cover" :alt="review.title">
          </div>
          <div class="post-content">
            <div class="post-meta-inline">
              <time>{{ formatDate(review.createdAt) }}</time>
              <StarRating :rating="review.rating" />
            </div>
            <h3>
              <router-link :to="'/reviews/' + review.slug">{{ review.title }}</router-link>
            </h3>
            <p>{{ review.excerpt }}</p>
            <router-link :to="'/reviews/' + review.slug" class="read-more">Read More →</router-link>
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
      
      <div v-if="filteredReviews.length === 0" class="no-results">
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
  slug: string
  title: string
  author: string
  rating: number
  category: string
  publishedAt: string
  createdAt: string
  file: string
  cover: string
  excerpt: string
}

const route = useRoute()
const allReviews = ref<Review[]>([])
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = 6

const categories = ref<string[]>([])

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return allReviews.value
  return allReviews.value.filter(r => 
    r.category.split(',').map(c => c.trim()).includes(selectedCategory.value)
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredReviews.value.length / pageSize)
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredReviews.value.slice(start, end)
})

watch(selectedCategory, () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    // Fetch categories
    const catResponse = await fetch('/category.json')
    categories.value = await catResponse.json()

    // Fetch reviews
    const response = await fetch('/reviews.json')
    const data = await response.json()
    allReviews.value = data.sort((a: Review, b: Review) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
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
