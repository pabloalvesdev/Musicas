import { IMusic } from "@/interfaces";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";

// Instância única mantida na memória
const player = createAudioPlayer();

let audioModeReady = false;

async function ensureAudioMode() {
  if (audioModeReady) return;
  await setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    interruptionMode: "doNotMix",
  });
  audioModeReady = true;
}

export async function playAudio(obj: IMusic) {
  try {
    await ensureAudioMode();

    player.replace(obj.url);
    player.play();

    // Cria/atualiza a notificação de mídia nativa (MediaStyle)
    player.setActiveForLockScreen(
      true,
      {
        title: obj.title || "Tocando música",
        artist: obj.artist || "Música local",
        albumTitle: obj.album, // opcional
        // artworkUrl: obj.img, // opcional: URL da capa
      },
      {
        showSeekBackward: true,
        showSeekForward: true,
      },
    );
  } catch (error) {
    console.error("Erro ao iniciar reprodução:", error);
  }
}

/**
 * Retoma a reprodução da música atual que estava pausada.
 */
export function resumeAudio() {
  if (!player.playing) {
    player.play();
  }
}

/**
 * Pausa a reprodução atual.
 */
export function pauseAudio() {
  if (player.playing) player.pause();
}

/**
 * Altera a posição da música (em segundos).
 */
export function seekAudio(seconds: number) {
  player.seekTo(seconds);
}

/** Remove a notificação e os controles da tela de bloqueio. */
export function stopAudio() {
  player.pause();
  player.clearLockScreenControls();
}

export function getAudioPlayerInstance() {
  return player;
}
