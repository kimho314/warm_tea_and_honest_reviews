<template>
  <article v-if="review" class="max-w-detail mx-auto px-6 pt-page-top pb-24">
    <header class="mb-section-gap">
      <div v-if="review.cover" class="mb-12 max-w-xs mx-auto overflow-hidden">
        <img :src="review.cover" :alt="review.title" class="w-full h-auto object-cover grayscale" />
      </div>
      <h1 class="text-page font-serif mb-6 leading-tight text-center">{{ review.title }}</h1>

      <!-- ABOUT BOOK / METADATA (styled like the screenshot) -->
      <section class="mt-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-px flex-1 bg-[#E7C7C7]"></div>
          <h2 class="text-meta font-sans uppercase tracking-[0.25em] text-[#C9A2A2]">
            About Book
          </h2>
          <div class="h-px flex-1 bg-[#E7C7C7]"></div>
        </div>

        <div class="border border-[#E7C7C7] px-6 py-8 md:px-10 md:py-10">
          <div class="text-base font-sans">
            <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6">
              <div class="text-meta font-sans uppercase tracking-[0.22em] text-[#C9A2A2]">
                Title
              </div>
              <div class="min-w-0">
                <span class="font-sans text-text underline decoration-dotted underline-offset-4">
                  {{ review.title }}
                </span>
              </div>

              <div class="text-meta font-sans uppercase tracking-[0.22em] text-[#C9A2A2]">
                Author
              </div>
              <div class="min-w-0">
                <span class="font-sans text-text">{{ review.author }}</span>
              </div>

              <div class="text-meta font-sans uppercase tracking-[0.22em] text-[#C9A2A2]">
                Genre
              </div>
              <div class="min-w-0">
                <span class="font-sans text-[#C9A2A2]">
                  {{ review.category || '—' }}
                </span>
              </div>

              <div class="text-meta font-sans uppercase tracking-[0.22em] text-[#C9A2A2]">
                Published
              </div>
              <div class="min-w-0">
                <span class="font-sans text-text">{{ review.publishedAt }}</span>
              </div>

              <div class="text-meta font-sans uppercase tracking-[0.22em] text-[#C9A2A2]">
                My rating
              </div>
              <div class="min-w-0">
                <span class="inline-flex items-center font-sans text-text">
                  <span class="text-[#C9A227] tracking-[0.22em]">
                    {{ starString(review.rating) }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>

    <div v-if="loading" class="py-12 text-center text-meta text-muted font-sans">
      Loading review...
    </div>

    <div v-else-if="error" class="py-12 text-center text-meta text-muted font-sans">
      {{ error }}
    </div>

    <div v-else class="prose font-sans text-base text-text" v-html="htmlContent"></div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import mammoth from 'mammoth'

const route = useRoute()
const review = ref<any>(null)
const htmlContent = ref('')
const loading = ref(true)
const error = ref('')

const starString = (rating: unknown) => {
  const n = typeof rating === 'number' ? rating : Number(rating)
  const safe = Number.isFinite(n) ? Math.max(0, Math.min(5, Math.round(n))) : 0
  return '★'.repeat(safe) + '☆'.repeat(5 - safe)
}

onMounted(async () => {
  const slug = String(route.params.slug ?? '')

  try {
    const metaResponse = await fetch('/reviews.json')
    if (!metaResponse.ok) throw new Error('Failed to load /reviews.json')

    const allReviews = await metaResponse.json()
    review.value = allReviews.find((r: any) => r.slug === slug)

    if (!review.value) {
      error.value = 'Review not found.'
      return
    }

    const docxPath = `/reviews/${review.value.file}.docx`
    if (!docxPath) throw new Error('Missing "file" for this review in reviews.json')

    const docxResponse = await fetch(docxPath)
    if (!docxResponse.ok) throw new Error(`Failed to load ${docxPath}`)

    const arrayBuffer = await docxResponse.arrayBuffer()

    const result = await mammoth.convertToHtml({ arrayBuffer })
    htmlContent.value = result.value
  } catch (e) {
    console.error('Error loading review:', e)
    error.value = 'Failed to load review content.'
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* Styling for mammoth-generated HTML */
.prose p {
  margin-bottom: 1.25em;
  line-height: 1.8;
}
.prose h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  line-height: 1.3;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}
</style>
