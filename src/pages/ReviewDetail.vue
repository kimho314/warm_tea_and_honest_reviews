<template>
  <div class="review-detail" v-if="review">
    <div class="review-header">
      <div class="header-content">
        <div class="review-cover">
          <img :src="review.imageUrl" :alt="review.title">
        </div>
        <div class="review-meta-top">
          <span class="category">{{ review.categories.join(', ') }}</span>
          <h1>{{ review.title }}</h1>
          <div class="meta-list">
            <div class="meta-item">
              <span class="meta-label">Rating :</span>
              <span class="meta-value"><StarRating :rating="review.rating" /></span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Author :</span>
              <span class="meta-value">{{ review.author }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Pages :</span>
              <span class="meta-value">{{ review.page }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Publication Date :</span>
              <span class="meta-value">{{ formatDate(review.publishedAt) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Original Language :</span>
              <span class="meta-value">{{ review.language }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div v-if="review.excerpt" class="review-excerpt">
      <p>{{ review.excerpt }}</p>
    </div>

    <article class="review-body">
      <div v-if="loading" class="loading">Loading review content...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else v-html="contentHtml" class="content"></div>
    </article>
  </div>
  <div v-else-if="!loading" class="not-found">
    <p>Review not found.</p>
    <router-link to="/reviews">Back to all reviews</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import StarRating from '../components/StarRating.vue'
import { formatDate } from '../utils/dateUtils'

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
  content: string
  imageUrl: string
}

const route = useRoute()
const review = ref<Review | null>(null)
const contentHtml = ref('')
const loading = ref(true)
const error = ref('')

useHead({
  title: computed(() => review.value ? `${review.value.title} | Warm Tea & Honest Reviews` : 'Review Detail'),
  meta: [
    {
      name: 'description',
      content: computed(() => review.value ? `${review.value.author}의 '${review.value.title}' 리뷰입니다. ${review.value.excerpt}` : 'Read our honest book review.')
    },
    {
      property: 'og:title',
      content: computed(() => review.value ? review.value.title : 'Book Review')
    },
    {
      property: 'og:image',
      content: computed(() => review.value ? review.value.imageUrl : '')
    }
  ]
})

onMounted(async () => {
  try {
    const response = await fetch(`/api/reviews/${route.params.slug}`)
    if (!response.ok) {
      if (response.status === 404) {
        loading.value = false
        return
      }
      throw new Error('Failed to fetch review from API')
    }
    const data: Review = await response.json()
    review.value = data
    contentHtml.value = data.content
    loading.value = false
  } catch (err) {
    console.error('Error fetching review from API:', err)
    error.value = 'Failed to load review content.'
    loading.value = false
  }
})
</script>

<style scoped>
.review-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
}

.review-header {
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 40px;
}

.review-cover img {
  max-width: 300px;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.category {
  display: block;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  color: #888;
  margin-bottom: 15px;
}

.review-meta-top h1 {
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 25px;
  line-height: 1.2;
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.meta-item {
  display: flex;
  gap: 10px;
  font-size: 16px;
  line-height: 1.4;
}

.meta-label {
  font-weight: 600;
  color: #333;
  min-width: 150px;
}

.meta-value {
  color: #666;
}

.meta-value :deep(.star-rating) {
  display: inline-flex;
}

.separator {
  color: #ddd;
}

.review-excerpt {
  margin: 40px auto;
  font-style: italic;
  font-size: 20px;
  color: #555;
  text-align: center;
  max-width: 700px;
  line-height: 1.6;
}

.review-body {
  margin-top: 60px;
  font-size: 18px;
  line-height: 1.8;
  color: #333;
}

.content :deep(p) {
  margin-bottom: 25px;
}

.content :deep(h2), .content :deep(h3) {
  margin: 40px 0 20px;
  font-weight: 400;
}

.loading, .error, .not-found {
  text-align: center;
  margin: 100px 0;
  color: #888;
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
  
  .meta-list {
    align-items: flex-start;
  }
}
</style>
