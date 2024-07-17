// src/store/store.js
import {defineStore} from 'pinia';

const store = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    user: null,
    conversation: null
  }),
  actions: {
    addUser(user) {
      console.log(this.users);
      this.users.push(user);
      console.log(this.users);
    },
    removeUser(index) {
      this.users.splice(index, 1);
    },
    connectUser(user) {
      this.user = user;
    },
    logoutUser() {
      this.user = null;
    },
    setConversation(conversation) {
      this.conversation = conversation;
    },
    updateUserConversations(oldConversation, newConversation) {
      const index = this.user.conversations.indexOf(oldConversation);
      this.user.conversations[index] = newConversation;
    }
  },
});

export const useStore = store;
