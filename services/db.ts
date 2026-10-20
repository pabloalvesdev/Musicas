import { IMusic, IPlaylist } from "@/interfaces";
import IPlaylistCreate from "@/interfaces/IPlaylistCreate";
import { randomUUID } from "expo-crypto";
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

export const getPlaylistsFromDB = async (): Promise<IPlaylist[]> => {
  return await db.getAllAsync<IPlaylist>(
    "SELECT * FROM playlists ORDER BY name ASC;",
  );
};

export const createPlaylistToDB = async (
  payload: IPlaylistCreate,
): Promise<IPlaylist> => {
  const newPlaylistId = randomUUID();
  await db.runAsync("INSERT INTO playlists (id, name) VALUES (?, ?)", [
    newPlaylistId,
    payload.name,
  ]);

  await db.withTransactionAsync(async () => {
    // 1. Insere a playlist e pega o ID gerado

    // 2. Prepara a statement para inserir as relações com as músicas
    const statement = await db.prepareAsync(
      "INSERT INTO playlist_songs (song_id, playlist_id) VALUES ($song_id, $playlist_id);",
    );

    try {
      // 3. Itera sobre as músicas e salva o relacionamento
      for (const song of payload.musics) {
        await statement.executeAsync({
          $song_id: song.id,
          $playlist_id: newPlaylistId,
        });
      }
    } finally {
      // Garante que o statement será finalizado mesmo se houver erro no loop
      await statement.finalizeAsync();
    }
  });

  // Retorna o objeto completo da playlist criada
  return {
    id: newPlaylistId,
    name: payload.name,
    musics: payload.musics,
  };
};
