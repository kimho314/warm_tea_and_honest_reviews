<template>
  <div class="min-h-screen">
    <header class="border-b border-border">
      <div class="max-w-content mx-auto px-page-padding py-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <img src="/images/Logo.png" alt="Logo" class="w-32 md:w-40 h-auto object-contain" />
        <nav class="flex space-x-8">
          <router-link to="/" class="text-xs text-text-secondary no-underline hover:text-text-primary uppercase tracking-[0.2em] transition-colors">HOME</router-link>
          <router-link to="/reviews" class="text-xs text-text-secondary no-underline hover:text-text-primary uppercase tracking-[0.2em] transition-colors">Books</router-link>
          <router-link to="/about" class="text-xs text-text-secondary no-underline hover:text-text-primary uppercase tracking-[0.2em] transition-colors">About</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer class="max-w-content mx-auto px-page-padding py-24 mt-section-gap border-t border-border">
      <div class="flex flex-col items-center">
        <p class="text-meta text-text-secondary font-sans tracking-widest uppercase mb-4">Warm Tea & Honest Reviews</p>
        <p class="text-meta text-text-secondary font-sans text-center">© 2026. Warm tea and honest reviews.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Main App component
</script>

<style>
/* Global styles already handled in main.css */
</style>
