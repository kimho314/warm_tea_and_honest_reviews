<template>
  <header>
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <router-link to="/">
            <img src="/images/Logo.png" alt="Warm Tea & Honest Reviews" class="logo-img">
          </router-link>
        </div>
        <ul class="nav-menu">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/reviews">Books</router-link></li>
        </ul>
        <div class="search-icon">
          <a href="#">⌕</a>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <router-view></router-view>
  </main>

  <footer>
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Warm Tea & Honest Reviews | All Rights Reserved</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Disclaimer</a>
        <a href="#">Terms and Conditions</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style>
/* Global styles can be imported here or handled in main.css */
</style>
