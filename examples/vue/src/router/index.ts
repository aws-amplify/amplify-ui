import { createRouter, createWebHistory } from "vue-router";
import routes from "voie-pages";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
