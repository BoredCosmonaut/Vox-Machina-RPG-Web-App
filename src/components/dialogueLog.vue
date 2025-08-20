<template>
  <div class="dialogue-container" ref="dialogueContainer">
    <div
      v-for="(block, index) in store.dialogue"
      :key="index"
      class="dialogue-block"
      :class="getSpeakerClass(block.speaker)"
    >
      <img :src="getPortrait(block.speaker)" class="portrait" />
      <div class="text-container">
        <p class="speaker">{{ block.speaker }}:</p>
        <p class="text">{{ block.text }}</p>
      </div>
    </div>

    <div v-if="store.loading" class="dm-loading">
      <p class="dm-think">DM is thinking<span class="dots">...</span></p>
    </div>

  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore';
import { onMounted, ref } from "vue";

const store = useGameStore();
const dialogueContainer = ref(null);

// Map of portraits
const portraitMap = {
  Player: 'https://creator.nightcafe.studio/jobs/dfNqO0TjlasVS3rPw3w6/dfNqO0TjlasVS3rPw3w6--1--3mdf5.jpg',    // your custom player portrait
  DM: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/05/dungeons-and-dragons-dm.jpg',            // DM portrait
  Laura: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt20_oyeD-MmUOtmACVOmm-ClB0XrCE_g9WQ&s',    // Vex'ahlia
  Liam: 'https://pbs.twimg.com/media/EtZxF5RXYAI8fbv.jpg:large',      // Vax'ildan
  Taliesin: 'https://i.pinimg.com/564x/ef/4e/89/ef4e89638af793c16380db0e0ac85667.jpg',  // Percy
  Marisha: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b1ed5128840497.55d4cd1a09716.jpg',   // Keyleth
  Travis: 'https://anebarone.com/wp-content/uploads/2018/04/Anebarone-Grim.jpg',   // Grog
  Sam: 'https://i.pinimg.com/236x/98/7c/89/987c892a77fa5f4bdeab8b1c151148ff.jpg',       // Scanlan
  Ashley: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhGZnr8zc3E7gdVw4KfyY-9UDdy9VLeDymLwVvZRPgaAO1AJaeuJ9Gw9wfjkCn6JfIKFmXZLc-cMrtsLXvfumetCgF-2BpLZzUG0pCwdiewVu7iQXnirgh5q6v8DyXD3IKv8QoQpwbZDRz/s1600/Sir+Oryn.jpg',       // Pike
  default: 'https://i.pinimg.com/236x/85/05/5e/85055e396a5893891a11908b183004a1.jpg'        // any other NPC
};


function getPortrait(speaker) {
  return portraitMap[speaker] || portraitMap.default;
}

function getSpeakerClass(speaker) {
  if (speaker === "Player") return "player-block";
  if (speaker === "DM") return "dm-block";

  const partyMembers = ["Vex", "Vax", "Percy", "Keyleth", "Grog", "Scanlan", "Pike"];
  if (partyMembers.includes(speaker)) return "party-block";

  return "npc-block";
}

onMounted(() => {
  store.setDialogueContainer(dialogueContainer);
  store.fetchStartScene();
});
</script>

<style scoped>
.dialogue-container {
  flex: 1;
  max-height: 600px;
  overflow-y: auto;
  margin: 25px auto 0px;
  position: relative;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialogue-block {
  display: flex;
  align-items: flex-start;
  max-width: 70%;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  word-wrap: break-word;
  gap: 0.5rem;
}

.portrait {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.text-container {
  display: flex;
  flex-direction: column;
}

.speaker {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  opacity: 0.7;
}

/* Speaker colors */
.player-block {
  align-self: flex-end;
  background: #d1e7ff;
  text-align: right;
  color: #2e8b57;
}

.dm-block {
  align-self: flex-start;
  background: #f0f0f0;
  text-align: left;
  color: #4b0082;
}

.party-block {
  align-self: flex-start;
  background: #e6e6fa;
  text-align: left;
  color: #6a0dad;
}

.npc-block {
  align-self: flex-start;
  background: #fff3cd;
  text-align: left;
  color: #8b4513;
}

/* DM loading */
.dm-think {
  font-weight: bold;
  font-size: 1.1rem;
}

.dots::after {
  content: '';
  display: inline-block;
  width: 0.8em;
  text-align: left;
  animation: dots 1s steps(3, end) infinite;
}

@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}


.input-container {
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #4b0082;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
