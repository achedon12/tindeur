<script setup>
import {VBtn, VIcon, VDivider} from 'vuetify/components';
import {switchPage} from "@/router";
import {useStore} from "@/store/store";
import {computed} from "vue";

const store = useStore();

const user = computed(() => store.user);

const goBack = () => {
  switchPage('/charo');
}

const seeConversation = (conversation) => {
  store.setConversation(conversation);
  switchPage('/conversation');
}

</script>

<template>

  <div class="container">
    <div class="main">
      <div class="actions">
        <v-btn
          icon
          @click="goBack"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="title">Mes messages</h1>
      </div>
      <div class="chat">
        <v-btn class="conversation" v-for="(conversation,index) in user.conversations" :key="index"
               @click="seeConversation(conversation)">
          <v-icon>mdi-account</v-icon>
          <p class="last-message">{{
              conversation.messages[conversation.messages.length - 1].me ?? conversation.messages[conversation.messages.length - 1].other
            }}</p>
        </v-btn>
      </div>
    </div>
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
  padding: 10px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  height: 10vh;
}

h1.title {
  position: absolute;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
}

div.chat {
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
