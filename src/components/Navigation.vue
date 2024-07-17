<template>
  <nav class="menu">
    <VBtn
      @click="showDialog = true"
    >
      <VIcon>mdi-account</VIcon>
      Modifier mon compte
    </VBtn>
    <VBtn
      @click="logout"
    >
      <VIcon>mdi-logout</VIcon>
      Se déconnecter
    </VBtn>

    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          Modifier mon compte
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.name"
            label="Nom"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.firstname"
            label="Prénom"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.age"
            label="Age"
            type="number"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateAccount">Mettre à jour</v-btn>
          <v-btn color="blue darken-1" text @click="showDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script setup>
import {
  VBtn,
  VIcon,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VSpacer,
  VTextField
} from 'vuetify/components';
import {useStore} from "@/store/store";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {switchPage} from "@/router";

const store = useStore();
const router = useRouter();
let showDialog = ref(false);
let user = reactive({...store.user});

const logout = () => {
  store.user = null;
  switchPage('/')
};

const updateAccount = () => {
  // Ici, vous pouvez ajouter le code pour mettre à jour le compte dans le store
  store.user = user;
  showDialog.value = false;
};
</script>

<style scoped>
.menu {
  position: absolute;
  top: 0;
  left: 50px;
  width: auto;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-center h1 {
  margin: 0;
  font-size: 24px;
}

.nav-right {
  display: flex;
  align-items: center;
}
</style>
