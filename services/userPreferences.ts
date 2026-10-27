import IUserPreferences from "@/interfaces/IUserPreferences";
import { createMMKV } from "react-native-mmkv";
export const storage = createMMKV();
const PREFERENCES_KEY = "user_preferences";
const LASTSYNC_KEY = "last_sync";

export const defaultPreferences: IUserPreferences = {
  autoPlay: true,
  isDarkMode: true,
  primaryColor: "#0b5583",
};

// Ler preferências (síncrono e instantâneo)
export function getUserPreferences(): IUserPreferences {
  try {
    const jsonValue = storage.getString(PREFERENCES_KEY);
    return jsonValue
      ? { ...defaultPreferences, ...JSON.parse(jsonValue) }
      : defaultPreferences;
  } catch (error) {
    console.error("Erro ao ler preferências do MMKV:", error);
    return defaultPreferences;
  }
}

// Guardar preferências
export function saveUserPreferences(
  prefs: Partial<IUserPreferences>,
): IUserPreferences {
  try {
    const current = getUserPreferences();
    const updated = { ...current, ...prefs };
    storage.set(PREFERENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Erro ao guardar preferências no MMKV:", error);
    return defaultPreferences;
  }
}

export function getLastSync(): string {
  try {
    const jsonValue = storage.getString(LASTSYNC_KEY);
    return jsonValue ?? "";
  } catch (error) {
    console.error("Erro ao ler preferências do MMKV:", error);
    return "";
  }
}

export function saveLastSync() {
  try {
    storage.set(LASTSYNC_KEY, new Date().toISOString());
  } catch (error) {
    console.error("Erro ao guardar preferências no MMKV:", error);
  }
}
