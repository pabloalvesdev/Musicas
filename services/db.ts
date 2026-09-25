import { IMusic } from "@/interfaces";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("library.db");

export const initDatabase = async (): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS songs (
      id TEXT PRIMARY KEY NOT NULL,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT NOT NULL,
      genre TEXT,
      duration REAL NOT NULL
    );
  `);
};

export const getSongsFromDB = async (): Promise<IMusic[]> => {
  return await db.getAllAsync<IMusic>(
    "SELECT * FROM songs ORDER BY title ASC;",
  );
};

export const saveSongsToDB = async (songs: IMusic[]): Promise<void> => {
  await db.withTransactionAsync(async () => {
    await db.execAsync("DELETE FROM songs;");

    const statement = await db.prepareAsync(
      "INSERT INTO songs (id, url, title, artist, album, genre, duration) VALUES ($id, $url,$title, $artist,$album, $genre,$duration);",
    );

    try {
      for (const song of songs) {
        await statement.executeAsync({
          $id: song.id,
          $url: song.url,
          $title: song.title,
          $artist: song.artist,
          $album: song.album,
          $genre: song.genre || "Desconhecido",
          $duration: song.duration,
        });
      }
    } finally {
      await statement.finalizeAsync();
    }
  });
};
