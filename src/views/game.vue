<template> 
    <div class="game-view">
        <dialogueLog />
        <inputBar />
    </div>
</template>

<script setup>
    import dialogueLog from '@/components/dialogueLog.vue';
    import inputBar from '@/components/inputBar.vue';
</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 600px;
  height: auto;
  margin: 0 auto;
  margin-top: 0px;
  color: #fff;
  font-family: 'Cinzel', serif;
}

</style>