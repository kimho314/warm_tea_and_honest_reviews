<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Warm Tea & Honest Reviews!</h1>
        <p>I’ve loved reading for as long as I can remember, and books have always been a big part of my life. This little space exists because I enjoy reading and chatting about the stories that stay with me.
          I’m not here to break books down into perfect pros and cons — and I’m definitely not a harsh critic. I read based on my mood, my feelings, and my personal taste, and I share my thoughts the same way. No rude comments, no strong negativity — just honest, friendly opinions.
          You’ll mostly find comforting reads here: emotional stories, gentle romances, and books that feel like a warm hug. I don’t review smut-heavy books or stories full of extreme violence. Think cozy, calm, and feel-good vibes.
          Good vibes are always welcome, kind comments are encouraged, and friendly discussions are appreciated. Just keep in mind — I write these reviews for myself first, simply because I enjoy it, not to impress anyone.
          So grab a cuppa, get comfy, and let’s have some chitty-chatty, honest review time ☕📖
        </p>
        <div class="divider"></div>
      </div>
    </section>

    <!-- Recent Reviews Section -->
    <section class="latest-posts">
      <h2>Recent Reviews</h2>
      <div class="divider"></div>
      <div class="posts-grid">
        <article v-for="review in recentReviews" :key="review.slug" class="post-card">
          <div class="post-image">
            <img :src="'/covers/' + review.cover" :alt="review.title">
          </div>
          <div class="post-content">
            <div class="post-meta-inline">
<!--              <time>{{ review.publishedAt }}</time>-->
<!--              <StarRating :rating="review.rating" />-->
            </div>
            <h3>
              <router-link :to="'/reviews/' + review.slug">{{ review.title }}</router-link>
            </h3>
            <p>{{ review.excerpt }}</p>
            <router-link :to="'/reviews/' + review.slug" class="read-more">Read More →</router-link>
          </div>
        </article>
      </div>
      <div class="view-all">
        <router-link to="/reviews" class="btn-view-all">View all reviews →</router-link>
      </div>
    </section>

    <!-- Categories Section -->
<!--    <section class="browse-topics">-->
<!--      <h2>Categories</h2>-->
<!--      <div class="divider"></div>-->
<!--      <div class="topics-grid">-->
<!--        <div class="topic-card">-->
<!--          <router-link to="/reviews?category=Fiction">-->
<!--            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop" alt="Fiction">-->
<!--            <h3>Fiction</h3>-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div class="topic-card">-->
<!--          <router-link to="/reviews?category=Travel">-->
<!--            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop" alt="Travel">-->
<!--            <h3>Travel</h3>-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div class="topic-card">-->
<!--          <router-link to="/reviews?category=Lifestyle">-->
<!--            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop" alt="Lifestyle">-->
<!--            <h3>Lifestyle</h3>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import StarRating from '../components/StarRating.vue'

useHead({
  title: 'Warm Tea & Honest Reviews | Cozy Book Reviews by Julia',
  meta: [
    {
      name: 'description',
      content: 'A calm, text-focused reading experience. Honest book reviews, cozy vibes, and friendly discussions about stories that stay with you.'
    },
    {
      name: 'keywords',
      content: 'book reviews, cozy reading, honest reviews, fiction, romance, book blog'
    },
    {
      property: 'og:title',
      content: 'Warm Tea & Honest Reviews'
    },
    {
      property: 'og:description',
      content: 'Honest book reviews, cozy vibes, and friendly discussions.'
    },
    {
      property: 'og:type',
      content: 'website'
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

const recentReviews = ref<Review[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    const data = await response.json()
    // Sort by createdAt and take latest 6
    recentReviews.value = data
      .sort((a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
})
</script>

<style scoped>
.hero {
  padding: 100px 20px;
  text-align: center;
  background-color: #fcfcfc;
}

.hero h1 {
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
}
</style>
