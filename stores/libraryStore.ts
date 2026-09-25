import { IMusic } from "@/interfaces";
import { getSavedSongs, syncLocalSongsWithDB } from "@/services/files";
import { create } from "zustand";

interface LibraryState {
  songs: IMusic[];
  isLoading: boolean;
  isSyncing: boolean;

  loadSongs: () => Promise<void>;
  refreshLibrary: () => Promise<void>;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  songs: [],
  isLoading: true,
  isSyncing: false,

  // Carrega instantaneamente do SQLite ao abrir o app
  loadSongs: async () => {
    set({ isLoading: true });
    const cachedSongs = await getSavedSongs();
    set({ songs: cachedSongs, isLoading: false });
  },

  // Sincroniza via MediaStore apenas ao apertar o botão manual
  refreshLibrary: async () => {
    set({ isSyncing: true });
    const freshSongs = await syncLocalSongsWithDB();
    set({ songs: freshSongs, isSyncing: false });
  },
}));
