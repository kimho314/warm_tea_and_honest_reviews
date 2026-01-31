<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Warm Tea & Honest Reviews</h1>
        <p>A calm, text-focused reading experience inspired by books, travel, and lifestyle.</p>
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
            <time>{{ review.publishedAt }}</time>
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
    <section class="browse-topics">
      <h2>Categories</h2>
      <div class="divider"></div>
      <div class="topics-grid">
        <div class="topic-card">
          <router-link to="/reviews?category=Fiction">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop" alt="Fiction">
            <h3>Fiction</h3>
          </router-link>
        </div>
        <div class="topic-card">
          <router-link to="/reviews?category=Travel">
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop" alt="Travel">
            <h3>Travel</h3>
          </router-link>
        </div>
        <div class="topic-card">
          <router-link to="/reviews?category=Lifestyle">
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop" alt="Lifestyle">
            <h3>Lifestyle</h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Review {
  slug: string
  title: string
  author: string
  rating: number
  category: string
  publishedAt: string
  file: string
  cover: string
  excerpt: string
}

const recentReviews = ref<Review[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/reviews.json')
    const data = await response.json()
    // Sort by date and take latest 6
    recentReviews.value = data
      .sort((a: Review, b: Review) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
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
