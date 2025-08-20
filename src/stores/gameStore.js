import { defineStore } from 'pinia';
import axios from 'axios';

let dialogueContainerRef = null;

export const useGameStore = defineStore('game', {
  state: () => ({
    dialogue: [],        // { speaker, text, portrait }
    playerInput: '',     // Player input
    loading: false,
  }),
  actions: {
    setDialogueContainer(ref) {
      dialogueContainerRef = ref;
    },

    scrollToBottom() {
      if (dialogueContainerRef?.value) {
        dialogueContainerRef.value.scrollTo({
          top: dialogueContainerRef.value.scrollHeight,
          behavior: "smooth"
        });
      }
    },

    normalizeSpeaker(speaker) {
      if (!speaker) return "DM";
      const s = speaker.trim().toLowerCase();

      // Skip Matthew
      if (s === "matthew") return null;

      if (s === "dm" || s === "response") return "DM";   // treat Response as DM
      if (s === "player") return "Player";
      return speaker; // party members / NPCs
    },

    async sendPlayerInput() {
      const trimmedInput = this.playerInput.trim();
      if (!trimmedInput) return;

      // Add player's message instantly
      this.dialogue.push({ speaker: "Player", text: trimmedInput });
      this.scrollToBottom();

      this.playerInput = '';
      this.loading = true;

      try {
        const response = await axios.post(
          'https://623b65e0fa24.ngrok-free.app/api/chat',
          { player_input: trimmedInput },
          { headers: { "ngrok-skip-browser-warning": "any-value" } }
        );

        const serverLines = response.data.response;

        if (Array.isArray(serverLines)) {
          serverLines.forEach(line => {
            const normalizedSpeaker = this.normalizeSpeaker(line.speaker);

            // Skip lines that should be ignored
            if (!normalizedSpeaker) return;

            this.dialogue.push({
              speaker: normalizedSpeaker,
              text: line.text
            });
            this.scrollToBottom();
          });
        }
      } catch (err) {
        console.error('Error sending input:', err);
      } finally {
        this.loading = false;
      }
    },

    async fetchStartScene() {
      this.loading = true;
      try {
        const res = await axios.get("https://623b65e0fa24.ngrok-free.app/api/start", {
          headers: { "ngrok-skip-browser-warning": "any-value" }
        });

        if (Array.isArray(res.data.response)) {
          res.data.response.forEach(line => {
            const normalizedSpeaker = this.normalizeSpeaker(line.speaker);

            if (!normalizedSpeaker) return;

            this.dialogue.push({
              speaker: normalizedSpeaker,
              text: line.text
            });
            this.scrollToBottom();
          });
        }
      } catch (err) {
        console.error("Error fetching start scene:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
