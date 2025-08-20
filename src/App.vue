<template>
  <div id="app">
    <game />
  </div>
</template>

<script setup>
import game from './views/game.vue';
</script>

<style>
#app {
  min-height: 100vh; /* ensures it fills the viewport */
  display: flex;
  flex-direction: column;
}

</style>
