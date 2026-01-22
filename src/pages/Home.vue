<template>
  <div class="max-w-list mx-auto px-6 pt-page-top pb-24">
    <header class="mb-section-gap">
      <p class="text-meta text-muted font-sans uppercase tracking-wider mb-4">Archive</p>
      <h2 class="text-site font-serif mb-6 leading-tight">Book Reviews</h2>
      <p class="text-base font-sans text-muted max-w-[70ch]">
        A calm, growing shelf of reviews—open a title to read the full piece.
      </p>
    </header>

    <section aria-labelledby="latest" class="mb-section-gap">
      <div class="flex items-baseline justify-between gap-6 mb-10">
        <h3 id="latest" class="text-section font-serif">Latest</h3>
        <router-link to="/reviews" class="text-meta font-sans text-muted no-underline hover:underline">
          View all →
        </router-link>
      </div>

      <div class="space-y-16">
        <article
          v-for="review in recentReviews"
          :key="review.slug"
          class="group"
        >
          <div class="flex flex-col md:flex-row md:items-start gap-10">
            <router-link
              v-if="review.cover"
              :to="'/reviews/' + review.slug"
              class="no-underline shrink-0 md:w-[320px]"
              aria-label="Open review"
            >
              <img
                :src="review.cover"
                :alt="review.title"
                class="w-full h-auto object-cover grayscale"
                loading="lazy"
              />
            </router-link>

            <div class="min-w-0 md:flex-1">
              <div class="mb-6">
                <span
                  class="inline-block px-6 py-2 bg-border text-text font-sans text-meta uppercase tracking-[0.25em]"
                >
                  Book Reviews
                </span>
              </div>

              <router-link :to="'/reviews/' + review.slug" class="no-underline">
                <h4
                  class="font-sans text-page leading-tight uppercase tracking-[0.12em]
                         group-hover:opacity-70 transition-opacity duration-100"
                >
                  {{ review.title }}
                </h4>
              </router-link>

              <div class="mt-5 text-meta text-muted font-sans flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>by <strong class="text-text font-sans">{{ review.author }}</strong></span>
                <span>·</span>
                <span>{{ review.publishedAt }}</span>
                <span v-if="review.category">
                  <span>·</span>
                  <span class="uppercase tracking-wider">{{ review.category }}</span>
                </span>
              </div>

              <div v-if="typeof review.rating === 'number'" class="mt-6 text-base font-sans">
                <span class="text-[#C9A227] tracking-[0.2em]">
                  {{ stars(review.rating) }}
                </span>
              </div>

              <p v-if="review.excerpt" class="mt-6 text-base font-sans leading-relaxed">
                {{ review.excerpt }}
              </p>

              <div class="mt-8">
                <router-link
                  :to="'/reviews/' + review.slug"
                  class="text-base font-sans no-underline hover:underline"
                >
                  Read more →
                </router-link>
              </div>
            </div>
          </div>

          <div class="mt-16 border-b border-border"></div>
        </article>
      </div>

      <div class="mt-12">
        <router-link to="/reviews" class="text-base font-sans no-underline hover:underline">
          Browse the full archive →
        </router-link>
      </div>
    </section>

    <section aria-labelledby="categories">
      <h3 id="categories" class="text-meta text-muted font-sans mb-6 uppercase tracking-wider">
        Categories
      </h3>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <router-link
          v-for="category in categories"
          :key="category"
          :to="'/reviews?category=' + encodeURIComponent(category)"
          class="text-base font-sans no-underline hover:underline"
        >
          {{ category }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type ReviewMeta = {
  slug: string
  title: string
  author: string
  publishedAt: string
  category?: string
  cover?: string
  excerpt?: string
  rating?: number
}

const recentReviews = ref<ReviewMeta[]>([])
const categories = ref<string[]>([])

const stars = (rating: number) => {
  const safe = Math.max(0, Math.min(5, Math.round(rating)))
  return '★'.repeat(safe) + '☆'.repeat(5 - safe)
}

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    if (!response.ok) throw new Error('Failed to load /reviews.json')

    const data: ReviewMeta[] = await response.json()

    const sorted = [...data].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    recentReviews.value = sorted.slice(0, 3)

    const allCategories = data
      .flatMap(r => (r.category ? r.category.split(',') : []))
      .map(c => c.trim())
      .filter(Boolean)

    categories.value = Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b))
  } catch (e) {
    console.error('Failed to fetch reviews:', e)
  }
})
</script>
