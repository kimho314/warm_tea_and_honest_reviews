<template>
  <div class="max-w-post-detail mx-auto px-page-padding py-16">
    <div v-if="loading" class="text-center py-24">
      <p class="text-text-secondary italic">Opening the book...</p>
    </div>

    <div v-else-if="review" class="animate-in fade-in duration-500">
      <header class="mb-16 text-center">
        <div class="aspect-[2/3] max-w-[300px] mx-auto mb-12 shadow-md border border-border/50">
          <img :src="'/covers/' + review.cover" :alt="review.title" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex flex-center justify-center items-center space-x-2 text-meta text-text-secondary uppercase tracking-[0.2em] mb-4">
          <span>{{ review.category }}</span>
          <span>·</span>
          <span>{{ formatDate(review.publishedAt) }}</span>
        </div>
        
        <h1 class="text-page-title mb-6">{{ review.title }}</h1>
        
        <div class="text-text-secondary font-serif italic text-lg">
          by {{ review.author }} · {{ renderRating(review.rating) }}
        </div>
      </header>

      <div class="divider w-12 h-px bg-border mx-auto mb-16"></div>

      <article class="prose prose-stone max-w-none prose-lg">
        <div v-html="htmlContent" class="review-body"></div>
      </article>

      <footer class="mt-24 pt-12 border-t border-border">
        <router-link to="/reviews" class="text-meta uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center">
          <span class="mr-2">←</span> Back to Books
        </router-link>
      </footer>
    </div>

    <div v-else class="text-center py-24">
      <h2 class="text-section-title mb-4">Book Not Found</h2>
      <p class="text-text-secondary mb-8">The book you're looking for isn't on our shelf.</p>
      <router-link to="/reviews" class="text-link">Back to Books</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import mammoth from 'mammoth'

interface Review {
  slug: string
  title: string
  author: string
  rating: number
  category: string
  publishedAt: string
  cover: string
  file: string
}

const route = useRoute()
const review = ref<Review | null>(null)
const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  const slug = route.params.slug as string
  
  try {
    // 1. Fetch metadata
    const response = await fetch('/reviews.json')
    if (response.ok) {
      const reviews: Review[] = await response.json()
      review.value = reviews.find(r => r.slug === slug) || null
      
      if (review.value) {
        // 2. Fetch and convert .docx
        const docxResponse = await fetch(`/reviews/${review.value.file}`)
        if (docxResponse.ok) {
          const arrayBuffer = await docxResponse.arrayBuffer()
          const result = await mammoth.convertToHtml({ arrayBuffer })
          htmlContent.value = result.value
        }
      }
    }
  } catch (error) {
    console.error('Failed to load review:', error)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const renderRating = (rating: number) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
}
</script>

<style scoped>
.review-body :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: var(--color-text-primary);
}

.review-body :deep(h2), .review-body :deep(h3) {
  font-family: var(--font-serif);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.review-body :deep(em) {
  font-style: italic;
}

.review-body :deep(strong) {
  font-weight: 600;
}
</style>
