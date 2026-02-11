<template>
  <div class="review-detail" v-if="review">
    <div class="review-header">
      <div class="header-content">
        <div class="review-cover">
          <img :src="'/covers/' + review.cover" :alt="review.title">
        </div>
        <div class="review-meta-top">
          <span class="category">{{ review.category }}</span>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import mammoth from 'mammoth'
import StarRating from '../components/StarRating.vue'
import { formatDate } from '../utils/dateUtils'

interface Review {
  slug: string
  title: string
  author: string
  rating: number
  page: number
  language: string
  category: string
  publishedAt: string
  file: string
  cover: string
  excerpt: string
}

const route = useRoute()
const review = ref<Review | null>(null)
const contentHtml = ref('')
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    const data = await response.json()
    const found = data.find((r: Review) => r.slug === route.params.slug)
    
    if (found) {
      review.value = found
      await loadWordContent(found.file)
    } else {
      loading.value = false
    }
  } catch (err) {
    console.error('Error fetching review metadata:', err)
    error.value = 'Failed to load review metadata.'
    loading.value = false
  }
})

async function loadWordContent(fileName: string) {
  try {
    const response = await fetch(`/reviews/${fileName}`)
    if (!response.ok) throw new Error('Could not find the Word document.')
    
    const arrayBuffer = await response.arrayBuffer()
    const result = await mammoth.convertToHtml({ arrayBuffer })
    contentHtml.value = result.value
  } catch (err) {
    console.error('Error converting Word document:', err)
    error.value = 'Failed to load review content.'
  } finally {
    loading.value = false
  }
}
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
