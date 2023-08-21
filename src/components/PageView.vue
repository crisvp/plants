<template>
  <RouterLink to="/">
    <HomeIcon
      class="h-10 w-10 mix-blend-difference rounded-2xl bg-white text-black hover:opacity-100 outline outline-1 outline-offset-2 hover:outline-3 hover:outline-blue-500 opacity-60 backdrop-invert cursor-pointer m-3 fixed"
    />
  </RouterLink>
  <div class="absolute mt-[50px] w-full h-full">
    <Suspense>
      <component :is="plantComponent" ref="markdown" class="markdown" @click="handleClick"></component>
    </Suspense>
  </div>
  <UnsplashAttribution :image="unsplash" />
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid';
import { onMounted, onUnmounted, reactive } from 'vue';

import { defaultBackground, getUnsplash, UnsplashImage } from '../lib/unsplash';
import UnsplashAttribution from './UnsplashAttribution.vue';

const props = defineProps<{ name: string }>();
const plantComponent = (await import(`../../pages/${props.name}.md`)).default;
const unsplash = reactive<UnsplashImage>({ url: '', name: '', profile: '' });

onMounted(async () => {
  try {
    const query = props.name.split(/(?=[A-Z])/).join(' ') + ' plant';
    Object.assign(unsplash, await getUnsplash(query));
  } catch (e) {
    Object.assign(unsplash, defaultBackground);
  }

  document.body.style.backgroundImage = `url(${unsplash.url})`;
  document.body.style.backgroundSize = 'cover';
});

onUnmounted(() => {
  document.body.style.backgroundImage = '';
  document.body.style.backgroundSize = '';
});

function handleClick(e: MouseEvent) {
  let node: HTMLElement | null = e.target as HTMLElement;
  while (node) {
    if (node.tagName === 'H1') {
      toggleElement(node);
      return;
    }
    node = node.parentElement;
  }
}

function toggleElement(node: HTMLElement) {
  const hidden = node.dataset.hidden === 'true';
  node.classList.add(hidden ? 'animate-slide-head-in' : 'animate-slide-head-out');
  node.classList.remove(hidden ? 'animate-slide-head-out' : 'animate-slide-head-in');
  console.log('hidden', hidden);
  node.dataset.hidden = hidden ? 'false' : 'true';
}
</script>

<style scoped>
@import '../style.pcss';
@layer components {
  .markdown {
    @apply bg-slate-100 text-gray-800 opacity-90;
    @apply font-sans prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-3 mb-3 rounded-sm;

    :deep(h1) {
      @apply fill-mode-forwards mt-2 ml-2 p-2 drop-shadow bg-green-800 text-white font-semibold sm:text-lg text-2xl rounded-l-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 fixed top-0 right-0 cursor-default;

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
