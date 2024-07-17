<script setup>
import FooterTinder from "@/components/FooterTinder.vue";
import {VBtn, VIcon} from 'vuetify/components';
import {computed, ref, watch} from "vue";
import {useStore} from "@/store/store";
import User from "@/components/User.vue";
import Navigation from "@/components/Navigation.vue";
import {switchPage} from "@/router";

const store = useStore();

const users = computed(() => store.users);
const user = computed(() => store.user);
let showNavigation = ref(false);
let endOfUsers = ref(false);


watch(() => store.user, (newVal) => {
  if (newVal === null) {
    switchPage('/');
  }
}, {immediate: true});

let currentIndex = 0;
let isAnimating = false;

document.addEventListener('keydown', (event) => {
  if (isAnimating) return;

  const cards = document.querySelectorAll('.card');

  let direction;
  if (event.key === 'ArrowLeft') {
    direction = 'left';
  } else if (event.key === 'ArrowRight') {
    direction = 'right';
  }

  if (direction) {
    isAnimating = true;
    const currentCard = cards[currentIndex];

    currentCard.classList.add(direction === 'right' ? 'leave-right' : 'leave-left');
    currentCard.addEventListener('transitionend', () => {
      currentCard.classList.remove('active', 'leave-left', 'leave-right');
      currentIndex++;

      if (currentIndex < cards.length) {
        const nextCard = cards[currentIndex];
        nextCard.classList.add('active');
      } else {
        endOfUsers.value = true;
      }

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }, {
      once: true
    });
  }
});

const test = () => {
  switchPage('/chat');
}

</script>

<template>
  <div class="container">
    <div class="main">
      <div class="actions">
        <v-btn
          icon
          @click="showNavigation = !showNavigation"
        >
          <img v-if="user && user.imagePath" :src="user.imagePath" alt="user"
               style="width: 50px; height: 50px; border-radius: 50%"/>
          <Navigation v-show="showNavigation"/>
        </v-btn>
        <v-btn
          icon
          @click="test"
        >
          <v-icon>mdi-message</v-icon>
        </v-btn>
      </div>
      <div :class="{ 'users': true, 'no-scroll': endOfUsers }">
        <User v-for="(user, index) in users.values()" :key="index" :user="user"
              :class="{ 'card': true, 'active': index === 0 }"
        />
        <div v-if="endOfUsers" class="end-of-users-message">
          Il n'y a plus aucun profil pour le moment, revenez plus tard.
        </div>
      </div>
    </div>
    <FooterTinder/>
  </div>
</template>

<style scoped>
div.container {
  width: 50%;
  margin: auto;
  height: 100%;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 0;
}

.users {
  display: flex;
  flex-direction: row;
  position: relative;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}


.card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: absolute;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  opacity: 0;
  transform: translateX(100%);
}

.card.active {
  opacity: 1;
  transform: translateX(0);
}

.card.leave-left {
  transform: translateX(-100%);
}

.card.leave-right {
  transform: translateX(100%);
}

div.main {
  max-height: 100%;
  width: 100%;
  position: relative;
  transition: transform 0.5s ease-in-out;
}

.actions {
  position: fixed;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
}

.end-of-users-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.5em;
}

.no-scroll {
  overflow: hidden !important;
}
</style>
