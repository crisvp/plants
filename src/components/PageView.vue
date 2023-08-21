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
  <div class="bg-slate-500 opacity-70 fixed bottom-0 right-0 text-sm">
    Background image by <a :href="unsplash.portfolio">{{ unsplash.name }}</a> on
    <a href="https://unsplash.com/?utm_source=plant-care-guide&utm_medium=referral">Unsplash</a>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid';
import { onMounted, reactive } from 'vue';

const props = defineProps<{ name: string }>();
const plantComponent = (await import(`../../pages/${props.name}.md`)).default;
const unsplash = reactive({ url: '', portfolio: '', name: '' });

interface UnsplashImage {
  url: string;
  portfolio: string;
  name: string;
}

onMounted(async () => {
  try {
    Object.assign(unsplash, await getUnsplash());
  } catch (e) {
    console.error(e);
    unsplash.url =
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80';
    unsplash.name = 'Nahil Naseer';
    unsplash.portfolio = 'https://unsplash.com/@nahilnaseer?utm_source=plant-care-guide&utm_medium=referral';
  }

  document.body.style.backgroundImage = `url(${unsplash.url})`;
  document.body.style.backgroundSize = 'cover';
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

async function getUnsplash(): Promise<UnsplashImage> {
  const query = props.name.split(/(?=[A-Z])/).join(' ') + ' plant';

  const result = await fetch(
    'https://api.unsplash.com/search/photos?' +
      new URLSearchParams({
        client_id: 'ns0oUaKF70K5B3hqSsiNzh24dAD533d67lJ3klN_KQ0',
        query,
      }),
    {
      method: 'GET',
      mode: 'cors',
    },
  );
  if (!result.ok) throw new Error('Failed to fetch image');
  if (!result.body) throw new Error('No response body');

  const reader = result.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const { value: chunk, done } = await reader.read();
  if (done) throw new Error('No response body');

  const data = JSON.parse(decoder.decode(chunk));
  const idx = Math.floor(Math.random() * data.results.length);

  return {
    url: data.results[idx].urls.regular,
    name: `${data.results[idx].user.name}`,
    portfolio: data.results[idx].user.portfolio_url ?? data.results[idx].user.links.html,
  };
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
