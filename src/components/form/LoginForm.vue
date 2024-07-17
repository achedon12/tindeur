<script setup>
import {ref} from 'vue';
import {VForm, VTextField, VFileInput, VBtn} from 'vuetify/components';
import {useStore} from "@/store/store";
import {switchPage} from "@/router";

const store = useStore();

const name = ref(store.user?.name ?? '');
const firstname = ref(store.user?.firstname ?? '');
const age = ref(store.user?.age ?? null);
const photo = ref(store.user?.imagePath ?? null);
const valid = ref(false);


const submit = async () => {
  if (valid.value) {
    const base64Image = await saveImage(photo.value);
    const user = {
      name: name.value,
      age: age.value,
      firstname: firstname.value,
      imagePath: base64Image,
      conversations: [
        {
          user: 'Lola Vincent',
          messages: [
            {
              me: 'Salut beauté des îles'
            },
            {
              other: 'Salut mon loulou'
            }
          ]
        }
      ]
    };
    const localStorage = window.localStorage;
    localStorage.setItem('user', JSON.stringify(user));
    store.connectUser(user);
    store.addUser({
      name: user.name,
      firstname: user.firstname,
      age: user.age,
      images: [{url: user.imagePath}]
    });
    switchPage('/charo');
  }
};

const saveImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    }
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const reset = () => {
  name.value = '';
  age.value = '';
  photo.value = null;
  valid.value = false;
};

const ageRules = value => {
  if (value >= 18) {
    return true;
  } else {
    return 'Vous devez avoir au moins 18 ans';
  }
};
const inputRules = value => {
  if (value !== '') {
    return true
  } else {
    return 'Veuillez rentrer une valeur';
  }
}
</script>

<template>
  <div class="container">
    <div class="heart"></div>
    <div class="form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="firstname"
          label="Prénom"
          required
          :rules="[inputRules]"
        ></v-text-field>

        <v-text-field
          v-model="name"
          label="Nom"
          required
          :rules="[inputRules]"
        ></v-text-field>

        <v-text-field
          v-model="age"
          label="Age"
          required
          type="number"
          :rules="[ageRules]"
        ></v-text-field>

        <v-file-input
          v-model="photo"
          label="Photo"
          prepend-icon="mdi-camera"
          accept="image/*"
        ></v-file-input>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Connexion
        </v-btn>
        <v-btn color="error" @click="reset">Supprimer</v-btn>
      </v-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 20px;
}

.form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

.heart {
  position: relative;
  width: 100px;
  height: 90px;
  background: red;
  animation: heartBeat 1s infinite;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(
    50% 100%,
    39% 83%,
    25% 75%,
    12% 67%,
    0% 50%,
    8% 25%,
    25% 0%,
    50% 15%,
    75% 0%,
    92% 25%,
    100% 50%,
    88% 67%,
    75% 75%,
    61% 83%
  );
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  background: red;
  border-radius: 50%;
}

.heart::before {
  top: -30px;
  left: 20px;
}

.heart::after {
  top: -30px;
  right: 20px;
}

.icons {
  display: flex;
  gap: 20px;
}

.icon-container {
  position: relative;
  width: 100px;
  height: 100px;
}

</style>
