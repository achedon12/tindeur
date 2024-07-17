<script setup>
import {VFooter, VBtn, VIcon} from 'vuetify/components';
</script>

<template>
  <v-footer>
    <v-btn icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-footer>
</template>

<style scoped>
.v-footer {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  bottom: 0;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
  height: 10vh;
}

footer .v-btn {
  color: #ff3e30;
}

footer .v-btn:nth-child(2) {
  color: #ffbb33;
}

footer .v-btn:nth-child(3) {
  color: #76c7c0;
}

footer .v-btn:nth-child(4) {
  color: #4caf50;
}

footer .v-btn:nth-child(5) {
  color: #2196f3;
}

</style>
