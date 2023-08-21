<template>
  <RouterLink to="/">
    <HomeIcon
      class="h-10 w-10 mix-blend-soft-light rounded-2xl bg-white text-black hover:opacity-100 outline outline-1 outline-offset-2 hover:outline-3 hover:outline-blue-500 opacity-60 backdrop-invert cursor-pointer m-3 fixed"
    />
  </RouterLink>
  <div class="absolute mt-[50px] w-full h-full">
    <div class="content">
      <h1>Home</h1>
      <h2>Plant Index</h2>
      <ul>
        <li v-for="[plant, path] in plants" :key="path">
          <router-link :to="path">
            {{ plant }}
          </router-link>
        </li>
      </ul>
    </div>
    <UnsplashAttribution :image="defaultBackground" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

import { defaultBackground } from '../lib/unsplash';
import UnsplashAttribution from './UnsplashAttribution.vue';

const props = defineProps<{ paths: string[] }>();
console.log(import.meta.env.VITE_UNSPLASH_DEFAULT_URL);

const plants = computed((): [string, string][] => {
  const result = props.paths.map((path) => {
    const p = path.match(/\/plant\/(.*)$/);
    if (!p) return [null, null];

    const name = p[1].split(/(?=[A-Z])/)?.join(' ');

    return [name, path];
  });

  return result.filter((r) => !!r[0]) as [string, string][];
});
</script>

<style scoped>
@import '../style.pcss';

@layer components {
  .content {
    @apply bg-slate-100 text-gray-800 opacity-90;
    @apply font-sans prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-3 mb-3 rounded-sm;

    :deep(h1) {
      @apply fill-mode-forwards mt-2 ml-2 p-2 drop-shadow bg-green-800 text-white font-semibold sm:text-lg cursor-default text-2xl rounded-l-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 fixed top-0 right-0;

      strong {
        @apply font-bold;
      }

      em {
        @apply italic text-lg;
      }
    }
  }
}
</style>
../unsplashj ../unsplash ../lib/unsplash
