import { createAudioPlayer } from "expo-audio";

let player = createAudioPlayer();

export function playSong(url: string) {
  player.replace(url);
  player.play();
}

export function pauseSong() {
  player.pause();
}

export function resumeSong() {
  player.play();
}

export function stopSong() {
  player.remove();
}
