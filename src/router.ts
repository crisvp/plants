import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router';

import IndexView from './components/IndexView.vue';
import PageView from './components/PageView.vue';

export default (args: Partial<RouterOptions> = {}) => {
  const pages = import.meta.glob('../pages/**/*.md');
  const pageRoutes = Object.entries(pages).map(([file]) => {
    const name = file.replace('../pages/', '').replace('.md', '');
    return {
      path: `/plant/${name}`,
      component: PageView,
      props: { name },
    };
  });
  const routes = [
    {
      name: 'Home',
      path: '/',
      component: IndexView,
      props: {
        paths: pageRoutes.map((route) => route.path),
      },
    },
    ...pageRoutes,
  ];

  if (args.routes) {
    args.routes = args.routes.concat(routes);
  }

  return createRouter({
    history: createWebHashHistory(),
    routes,
    ...args,
  });
};
