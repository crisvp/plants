import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import IndexView from "./components/IndexView.vue";

import App from "./App.vue";
import PageView from "./components/PageView.vue";
import "./style.pcss";

const pages = import.meta.glob("../pages/**/*.md");
const pageRoutes = Object.entries(pages).map(([file]) => {
  const name = file.replace("../pages/", "").replace(".md", "");
  return {
    path: `/plant/${name}`,
    component: PageView,
    props: { name },
  };
});

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: IndexView,
      props: {
        paths: pageRoutes.map((route) => route.path),
      },
    },
    ...pageRoutes,
  ],
});

console.log(pageRoutes);

const app = createApp(App);
app.use(router);
app.mount("#app");
