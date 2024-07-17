/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import Charo from "@/pages/Charo.vue";
import index from "@/pages/index.vue";
import Chat from "@/pages/Chat.vue";
import Conversation from "@/pages/Conversation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/charo',
      name: 'charo',
      component: Charo
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: Conversation
    }
  ]
});


export const switchPage = (page) => {
  if (router.currentRoute.value.path === page) {
    return;
  }
  // check if page  exist
  if (router.getRoutes().find((route) => route.path.toLowerCase() === page.toLowerCase())) {
    router.push(page);
  }
}

export default router;
