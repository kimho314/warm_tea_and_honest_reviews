<template>
  <div class="max-w-list mx-auto px-6 pt-page-top pb-24">
    <header class="mb-section-gap">
      <p class="text-meta text-muted font-sans uppercase tracking-wider mb-4">Archive</p>
      <h2 class="text-site font-serif mb-6 leading-tight">Book Reviews</h2>
      <p class="text-base font-sans text-muted max-w-[70ch]">
        A growing list of reviews—browse by category, open a title, and read the full piece.
      </p>

      <div
        v-if="selectedCategory"
        class="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4"
      >
        <span class="text-meta font-sans text-muted">
          Filtering by: <strong class="text-text">{{ selectedCategory }}</strong>
        </span>
        <button
          @click="clearFilter"
          class="text-meta font-sans underline hover:opacity-70"
          type="button"
        >
          Clear filter
        </button>
      </div>
    </header>

    <section aria-label="Review list">
      <div class="space-y-10">
        <article
          v-for="review in pagedReviews"
          :key="review.slug"
          class="group border-b border-border pb-10"
        >
          <div class="flex gap-6 items-start">
            <router-link
              v-if="review.cover"
              :to="'/reviews/' + review.slug"
              class="no-underline shrink-0"
              aria-label="Open review"
            >
              <img
                :src="review.cover"
                :alt="review.title"
                class="w-[92px] h-auto object-cover"
                loading="lazy"
              />
            </router-link>

            <div class="min-w-0">
              <router-link :to="'/reviews/' + review.slug" class="no-underline">
                <h3
                  class="text-page font-serif leading-tight group-hover:opacity-70 transition-opacity duration-100"
                >
                  {{ review.title }}
                </h3>
              </router-link>

              <div class="mt-3 text-meta text-muted font-sans flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{{ review.author }}</span>
                <span>·</span>
                <span>{{ review.publishedAt }}</span>
                <span v-if="review.category">
                  <span>·</span>
                  <span class="uppercase tracking-wider">{{ review.category }}</span>
                </span>
              </div>

              <p v-if="review.excerpt" class="mt-4 text-base font-sans leading-relaxed line-clamp-3">
                {{ review.excerpt }}
              </p>

              <div class="mt-5">
                <router-link
                  :to="'/reviews/' + review.slug"
                  class="text-base font-sans no-underline hover:underline"
                >
                  Read more →
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center gap-4 text-meta font-sans text-muted">
        <button
          type="button"
          class="underline hover:opacity-70 disabled:opacity-40 disabled:no-underline"
          :disabled="currentPage <= 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>

        <span>
          Page <strong class="text-text">{{ currentPage }}</strong> of
          <strong class="text-text">{{ totalPages }}</strong>
        </span>

        <button
          type="button"
          class="underline hover:opacity-70 disabled:opacity-40 disabled:no-underline"
          :disabled="currentPage >= totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type ReviewMeta = {
  slug: string
  title: string
  author: string
  publishedAt: string
  category?: string
  cover?: string
  excerpt?: string
}

const route = useRoute()
const router = useRouter()
const reviews = ref<ReviewMeta[]>([])

const PAGE_SIZE = 10

const selectedCategory = computed(() => (route.query.category as string) || '')

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return reviews.value
  return reviews.value.filter(r => r.category === selectedCategory.value)
})

const currentPage = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const n = Number(raw ?? 1)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredReviews.value.length / PAGE_SIZE))
})

const pagedReviews = computed(() => {
  const safePage = Math.min(currentPage.value, totalPages.value)
  const start = (safePage - 1) * PAGE_SIZE
  return filteredReviews.value.slice(start, start + PAGE_SIZE)
})

const clearFilter = () => {
  router.push({ path: '/reviews', query: {} })
}

const goToPage = (page: number) => {
  const safe = Math.min(Math.max(1, page), totalPages.value)

  const nextQuery: Record<string, string> = {}
  if (selectedCategory.value) nextQuery.category = selectedCategory.value
  if (safe > 1) nextQuery.page = String(safe)

  router.push({ path: '/reviews', query: nextQuery })
}

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    if (!response.ok) throw new Error('Failed to load /reviews.json')

    const data: ReviewMeta[] = await response.json()
    reviews.value = [...data].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (e) {
    console.error('Failed to fetch reviews:', e)
  }
})
</script>
