<template>
  <div class="star-rating" :title="rating.toFixed(1) + '/5'">
    <span v-for="i in 5" :key="i" class="star">
      <span v-if="i <= Math.floor(rating)" class="full">★</span>
      <span v-else-if="i === Math.ceil(rating) && rating % 1 !== 0" class="half">★</span>
      <span v-else class="empty">★</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number
}>()
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 2px;
  color: #ffc107; /* Gold color for stars */
  font-size: 1.1em;
}

.star {
  position: relative;
  display: inline-block;
}

.half {
  background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.empty {
  color: #ddd;
}
</style>
