<template>
  <div class="bg-slate-500 opacity-70 fixed bottom-0 right-0 text-sm">
    Background image by <a :href="props.image.profile">{{ props.image.name }}</a> on
    <a href="https://unsplash.com/?utm_source=plant-care-guide&utm_medium=referral">Unsplash</a>
  </div>
</template>

<script setup lang="ts">
import { UnsplashImage } from '../lib/unsplash';

const props = defineProps<{ image: UnsplashImage }>();
</script>
../unsplashj ../unsplash ../lib/unsplash
