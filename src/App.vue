<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import {useStore} from "@/store/store";
import {watch} from "vue";

const store = useStore();

const localStorage = window.localStorage;

watch(() => localStorage.getItem('user'), (newVal) => {
  store.connectUser(JSON.parse(newVal));
}, {immediate: true});
</script>

<style scoped>
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.v-application {
  height: 100%;
  overflow: hidden;
}

</style>
