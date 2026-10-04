import { IMusic } from "@/interfaces";
import * as SQLite from "expo-sqlite";

// Função para reparar acentuação/ç corrompidos pelas tags ID3
function sanitizeText(text?: string): string {
  if (!text) return "";
  try {
    // Tenta desmancilhar caracteres ISO-8859-1 interpretados como UTF-8
    return decodeURIComponent(escape(text));
  } catch {
    return text; // Se já estiver correto ou falhar o decode, devolve o texto original
  }
}

const db = SQLite.openDatabaseSync("library.db");

export const initDatabase = async (): Promise<void> => {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    -- 1. Tabela de Músicas
    CREATE TABLE IF NOT EXISTS songs (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      artist TEXT,
      album TEXT,
      img TEXT,
      genre TEXT DEFAULT 'Desconhecido',
      url TEXT NOT NULL,
      duration REAL,
      isFavorite INTEGER DEFAULT 0
    );

    -- 2. Tabela de Playlists
    CREATE TABLE IF NOT EXISTS playlists (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Tabela de Relacionamento (Músicas <-> Playlists)
    CREATE TABLE IF NOT EXISTS playlist_songs (
      playlist_id TEXT NOT NULL,
      song_id TEXT NOT NULL,
      PRIMARY KEY (playlist_id, song_id),
      FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
      FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
    );
  `);

  // Garante que o campo isFavorite seja adicionado se a tabela 'songs' já existia
  try {
    await db.execAsync(
      "ALTER TABLE songs ADD COLUMN isFavorite INTEGER DEFAULT 0;",
    );
  } catch (error) {
    // Coluna já existe
  }

  // Garante que o campo genre seja adicionado se a tabela 'songs' já existia
  try {
    await db.execAsync(
      "ALTER TABLE songs ADD COLUMN genre TEXT DEFAULT 'Desconhecido';",
    );
  } catch (error) {
    // Coluna já existe
  }

  try {
    await db.execAsync("ALTER TABLE songs ADD COLUMN img TEXT;");
  } catch (error) {
    // Coluna já existe
  }
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
      "INSERT INTO songs (id, url, title, artist, album, genre, duration, isFavorite, img) VALUES ($id, $url, $title, $artist, $album, $genre, $duration, $isFavorite, $img);",
    );

    try {
      for (const song of songs) {
        await statement.executeAsync({
          $id: song.id,
          $url: song.url,
          $title: sanitizeText(song.title),
          $artist: sanitizeText(song.artist) || "Artista Desconhecido",
          $album: sanitizeText(song.album) || "Álbum Desconhecido",
          $genre: sanitizeText(song.genre) || "Desconhecido",
          $duration: song.duration,
          $isFavorite: song.isFavorite ? 1 : 0,
          $img: sanitizeText(song.img) || "",
        });
      }
    } finally {
      await statement.finalizeAsync();
    }
  });
};
