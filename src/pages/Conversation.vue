<script setup>
import {useStore} from "@/store/store";
import {computed, ref, watch} from "vue";
import {VBtn, VIcon, VTextField} from "vuetify/components";
import {switchPage} from "@/router";

const store = useStore();
const conversation = computed(() => store.conversation);
const newMessage = ref('');

watch(() => store.conversation, (newVal) => {
  if (newVal === null) {
    switchPage('/');
  }
}, {immediate: true});

const goBack = () => {
  switchPage('/chat');
}

const sendMessage = () => {
  const conv = conversation.value;
  conversation.value.messages.push({me: newMessage.value});
  store.updateUserConversations(conv, conversation.value);
  newMessage.value = '';
};
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
        <h1 class="title">Conversation</h1>
      </div>
      <div class="conversation">
        <div class="message" v-for="(message, index) in conversation.messages"
             :class="{ 'me': message.me, 'other': message.other }" :key="index">
          <p>{{ message.me ?? message.other }}</p>
        </div>
      </div>
      <div class="message-input">
        <v-text-field
          v-model="newMessage"
          label="Nouveau message"
          class="input"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="sendMessage"
        >
          Envoyer
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

div.conversation {
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.message {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding: 10px;
}

.message.me {
  flex-direction: row;
}

.message.other {
  flex-direction: row-reverse;
}

.message p {
  background-color: #f0f0f0;
  color: #333333;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
}

.message-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
}

.input {
  flex-grow: 1;
  margin-right: 10px;
}

.v-btn {
  align-self: baseline;
}
</style>
