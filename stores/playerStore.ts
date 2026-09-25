// usePlayerStore.ts
import { IMusic } from "@/interfaces";
import { pauseAudio, playAudio, resumeAudio } from "@/services/player";
import { create } from "zustand";

interface PlayerState {
  currentSong: IMusic | null;
  queue: IMusic[];
  isPlaying: boolean;

  play: (song?: IMusic) => Promise<void>;
  pause: () => void;
  setQueue: (queue: IMusic[]) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,

  play: async (song) => {
    const { currentSong } = get();

    // Se passou uma música nova OU não havia nenhuma tocando
    if (song && song.id !== currentSong?.id) {
      await playAudio(song.url);
      set({ currentSong: song, isPlaying: true });
      return;
    }

    // Se é a mesma música que estava pausada, apenas despausa (resume)
    if (currentSong) {
      resumeAudio();
      set({ isPlaying: true });
    }
  },

  pause: () => {
    pauseAudio();
    set({ isPlaying: false });
  },

  setQueue: (queue) => set({ queue }),
}));
