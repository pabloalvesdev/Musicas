import { IMusic } from "@/interfaces";
import { AudioMetadata } from "@/modules/audio-metadata";
import { getSongsFromDB, initDatabase, saveSongsToDB } from "@/services/db";
import {
  AssetField,
  MediaType,
  Query,
  requestPermissionsAsync,
} from "expo-media-library";

export async function getSavedSongs(): Promise<IMusic[]> {
  try {
    await initDatabase();
    return await getSongsFromDB();
  } catch (error) {
    console.error("❌ Erro ao buscar músicas do SQLite:", error);
    return [];
  }
}

export async function syncLocalSongsWithDB(): Promise<IMusic[]> {
  try {
    const permission = await requestPermissionsAsync(false, ["audio"]);

    if (!permission.granted) {
      alert("Precisamos de permissão para ler as músicas!");
      return [];
    }

    const assets = await new Query()
      .eq(AssetField.MEDIA_TYPE, MediaType.AUDIO)
      .limit(500)
      .exe();

    console.log(`🎵 ${assets.length} arquivos encontrados via MediaStore`);

    const formattedSongs: IMusic[] = [];

    for (const asset of assets) {
      const uri = await asset.getUri();
      const filename = await asset.getFilename();
      const rawTitle = filename.replace(/\.[^/.]+$/, "");

      let metaTitle = rawTitle;
      let metaArtist = "<Desconhecido>";
      let metaAlbum = "Sem Álbum";
      let metaGenre = "Desconhecido";
      let metaDuration = 0;

      // Chama seu módulo nativo Kotlin
      try {
        const metadata = await AudioMetadata.getMetadata(uri);

        if (metadata) {
          if (metadata.title?.trim()) metaTitle = metadata.title.trim();
          if (metadata.artist?.trim()) metaArtist = metadata.artist.trim();
          if (metadata.album?.trim()) metaAlbum = metadata.album.trim();
          if (metadata.genre?.trim()) metaGenre = metadata.genre.trim();
          if (metadata.duration) metaDuration = metadata.duration;
        }
      } catch (err) {
        console.warn(
          `⚠️ Não foi possível extrair metadata do arquivo ${filename}:`,
          err,
        );
      }

      formattedSongs.push({
        id: String(asset.id),
        url: String(uri),
        title: metaTitle,
        artist: metaArtist,
        album: metaAlbum,
        genre: metaGenre,
        duration: metaDuration,
      });
    }

    // Grava tudo no SQLite de uma vez só
    await saveSongsToDB(formattedSongs);
    console.log(
      `💾 ${formattedSongs.length} músicas com metadados salvas no SQLite`,
    );

    return formattedSongs;
  } catch (error) {
    console.error("❌ Erro ao sincronizar acervo:", error);
    return [];
  }
}
