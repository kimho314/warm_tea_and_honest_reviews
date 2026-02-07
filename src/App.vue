<template>
  <header>
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <router-link to="/">
            <img src="/images/Logo.png" alt="Warm Tea & Honest Reviews" class="logo-img">
          </router-link>
        </div>
        
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <ul class="nav-menu" :class="{ 'is-open': isMenuOpen }">
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/about" @click="closeMenu">About</router-link></li>
          <li><router-link to="/reviews" @click="closeMenu">Books</router-link></li>
        </ul>
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
        <router-link to="/privacy">Privacy Policy</router-link>
<!--        <a href="#">Disclaimer</a>-->
        <router-link to="/terms">Terms and Conditions</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentYear = new Date().getFullYear()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style>
/* Global styles can be imported here or handled in main.css */
</style>
