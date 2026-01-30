<template>
  <div class="max-w-content mx-auto px-page-padding py-16">
    <section class="text-center mb-24 py-12">
      <h2 class="text-site-title mb-6">A Quiet Corner for Literary Reflection</h2>
      <p class="text-text-secondary italic text-lg max-w-md mx-auto leading-relaxed">Thoughtful reviews of the books that linger in the mind long after the last page is turned.</p>
    </section>

    <section>
      <div class="flex justify-between items-baseline mb-8">
        <h3 class="text-section-title">Recent Books</h3>
        <router-link to="/reviews" class="text-meta uppercase tracking-wider text-text-secondary hover:text-text-primary">View All</router-link>
      </div>
      
      <div v-if="loading" class="text-center py-12">
        <p class="text-text-secondary">Brewing some tea...</p>
      </div>
      
      <div v-else-if="recentReviews.length > 0" class="space-y-12">
        <article v-for="review in recentReviews" :key="review.slug" class="group">
          <router-link :to="'/reviews/' + review.slug" class="block no-underline">
            <div class="aspect-[2/3] max-w-[240px] mx-auto mb-8 overflow-hidden bg-gray-50 border border-border/50 shadow-sm">
              <img 
                :src="'/covers/' + review.cover" 
                :alt="review.title" 
                class="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </div>
            <header>
              <div class="flex items-center space-x-2 text-meta text-text-secondary uppercase tracking-widest mb-2">
                <span>{{ review.category }}</span>
                <span>·</span>
                <span>{{ formatDate(review.publishedAt) }}</span>
              </div>
              <h4 class="text-section-title group-hover:text-accent transition-colors mb-2">{{ review.title }}</h4>
              <p class="text-text-secondary line-clamp-2 leading-relaxed">{{ review.excerpt }}</p>
            </header>
          </router-link>
        </article>
      </div>

      <div v-else class="text-center py-12 border border-dashed border-border">
        <p class="text-text-secondary font-serif italic">The bookshelf is currently empty.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Review {
  slug: string
  title: string
  author: string
  rating: number
  category: string
  publishedAt: string
  cover: string
  excerpt: string
}

const reviews = ref<Review[]>([])
const loading = ref(true)

const recentReviews = computed(() => {
  return [...reviews.value]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)
})

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    if (response.ok) {
      reviews.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
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
</script>
