<template>
  <div class="min-h-screen">
    <header class="max-w-list mx-auto px-6 pt-page-top">
      <router-link to="/" class="no-underline">
        <h1 class="text-site font-serif">Warm Tea & Honest Reviews</h1>
      </router-link>
      <nav class="mt-6 flex space-x-6">
        <router-link to="/reviews" class="text-meta text-muted no-underline hover:underline">All Reviews</router-link>
        <router-link to="/about" class="text-meta text-muted no-underline hover:underline">About</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer class="max-w-list mx-auto px-6 py-12 mt-section-gap border-t border-border">
      <p class="text-meta text-muted font-sans">© 2026 Warm Tea & Honest Reviews. A calm reading space.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Main App component
</script>

<style>
/* Global styles already handled in main.css */
</style>
