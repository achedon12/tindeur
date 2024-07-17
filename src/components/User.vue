<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="user" v-if="user && user.images">
    <header class="position-relative w-100 pa-1 pt-0 pb-0">
      <img
        :src="user.images[0].url"
        alt="profile-image"
      />
      <div class="infos">
        <h3>{{ user.firstname }} {{ user.name }}</h3>
        <p>{{ user.age }}</p>
      </div>
    </header>
    <div class="user-content">
      <div class="additional-photos">
        <img
          v-for="(photo, index) in user.images"
          :key="index"
          :src="photo.url"
          alt="additional photo"
        />
      </div>
      <div class="description">
        <p>{{ user.bio }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    Loading user...
  </div>
</template>

<style scoped>
img {
  position: relative;
  width: 100%;
  max-height: 90vh;
  transition: transform 0.5s ease-in-out;
}

.user-content {
  padding: 10px;
}

.infos {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.infos h3 {
  margin: 0;
  font-size: 24px;
}

.infos p {
  margin: 0;
  font-size: 18px;
}
</style>
