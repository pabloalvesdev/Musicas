import { IMusic } from "@/interfaces";
import {
  pauseAudio,
  playAudio,
  resumeAudio,
  seekAudio,
} from "@/services/player";
import { create } from "zustand";

interface PlayerState {
  currentSong: IMusic | null;
  isPlaying: boolean;
  queue: IMusic[];
  currentIndex: number;

  // Ações
  play: (song: IMusic) => void;
  pause: () => void;
  resume: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setQueue: (songs: IMusic[]) => void;
  seek: (seconds: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  // Toca uma música específica
  play: (song: IMusic) => {
    const { queue } = get();
    const index = queue.findIndex((item) => item.id === song.id);

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: index !== -1 ? index : get().currentIndex,
    });

    // Chama o áudio nativo no player.ts
    playAudio(song.url);
  },

  // Pausa a reprodução
  pause: () => {
    pauseAudio();
    set({ isPlaying: false });
  },

  // Retoma a reprodução
  resume: () => {
    resumeAudio();
    set({ isPlaying: true });
  },

  // Avança para a próxima música da fila
  nextSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const nextIndex = (currentIndex + 1) % queue.length; // Loop circular na fila
    const nextSongItem = queue[nextIndex];

    if (nextSongItem) {
      set({
        currentSong: nextSongItem,
        currentIndex: nextIndex,
        isPlaying: true,
      });
      playAudio(nextSongItem.url);
    }
  },

  // Volta para a música anterior da fila
  previousSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const prevIndex =
      currentIndex - 1 < 0 ? queue.length - 1 : currentIndex - 1;
    const prevSongItem = queue[prevIndex];

    if (prevSongItem) {
      set({
        currentSong: prevSongItem,
        currentIndex: prevIndex,
        isPlaying: true,
      });
      playAudio(prevSongItem.url);
    }
  },

  // Define a lista/fila atual
  setQueue: (songs: IMusic[]) => {
    set({ queue: songs });
  },

  // Salta para um ponto da música (Seek)
  seek: (seconds: number) => {
    seekAudio(seconds);
  },
}));
