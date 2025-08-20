<script setup>
    import { useGameStore } from '@/stores/gameStore';
    const store = useGameStore();

</script>

<template>
    <div class="inputBar">
        <input
            class="textInput"
            v-model="store.playerInput"
            @keyup.enter="store.sendPlayerInput"
            placeholder="What do you want to do?"
            :disabled="store.loading"
            required
        />
        <button @click="store.sendPlayerInput" :disabled="store.loading">Send</button>
    </div>
</template>

<style scoped>
.inputBar {
  display: flex;
  margin: auto;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.textInput {
  flex: 1;
  padding: 0.5rem;
  width: 50%;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
  background-color: white;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  border-left: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #ffdfb5;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #f5deb3;
}
</style>