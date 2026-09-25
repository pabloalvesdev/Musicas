import { createAudioPlayer } from "expo-audio";

// Instância única mantida na memória
const player = createAudioPlayer();

/**
 * Toca uma nova música a partir da URL/URI informada.
 */
export async function playAudio(url: string) {
  try {
    // 1. Carrega a nova fonte no player
    player.replace(url);

    // 2. Toca a música
    player.play();
  } catch (error) {
    console.error("Erro ao reproduzir áudio:", error);
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
  if (player.playing) {
    player.pause();
  }
}

/**
 * Altera a posição da música (em segundos).
 */
export function seekAudio(seconds: number) {
  player.seekTo(seconds);
}

/**
 * Retorna o objeto do player caso você precise registrar ouvintes de evento
 * (ex: para monitorar o progresso em tempo real na barra de seek).
 */
export function getAudioPlayerInstance() {
  return player;
}
