<template>
  <div class="max-w-content mx-auto px-page-padding py-16">
    <header class="mb-12">
      <h2 class="text-page-title mb-4">All Books</h2>
      <p class="text-text-secondary">Explore the archive of literary reflections.</p>
    </header>

    <div v-if="loading" class="text-center py-12">
      <p class="text-text-secondary italic">Gathering books...</p>
    </div>

    <div v-else-if="reviews.length > 0" class="divide-y divide-border">
      <article v-for="review in sortedReviews" :key="review.slug" class="py-10 group">
        <router-link :to="'/reviews/' + review.slug" class="grid md:grid-cols-4 gap-8 no-underline">
          <div class="md:col-span-1">
            <div class="aspect-[3/4] overflow-hidden bg-gray-50 border border-border/50 shadow-sm">
              <img 
                :src="'/covers/' + review.cover" 
                :alt="review.title" 
                class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </div>
          <div class="md:col-span-3 flex flex-col justify-center">
            <div class="flex items-center space-x-2 text-meta text-text-secondary uppercase tracking-widest mb-2">
              <span>{{ review.category }}</span>
              <span>·</span>
              <span>{{ formatDate(review.publishedAt) }}</span>
            </div>
            <h3 class="text-section-title group-hover:text-accent transition-colors mb-2">{{ review.title }}</h3>
            <p class="text-text-secondary line-clamp-3 leading-relaxed">{{ review.excerpt }}</p>
          </div>
        </router-link>
      </article>
    </div>

    <div v-else class="text-center py-12 border border-dashed border-border">
      <p class="text-text-secondary font-serif italic">No books found in the archive.</p>
    </div>
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

const sortedReviews = computed(() => {
  return [...reviews.value].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
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
    month: 'long'
  })
}
</script>
