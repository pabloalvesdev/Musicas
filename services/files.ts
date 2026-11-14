import { IMusic } from "@/interfaces";
import { AudioMetadata } from "@/modules/audio-metadata";
import { getSongsFromDB, initDatabase, saveSongsToDB } from "@/services/db";
import * as FileSystem from "expo-file-system/legacy"; // SDK 54+; antes: "expo-file-system"
import {
  AssetField,
  MediaType,
  Query,
  requestPermissionsAsync,
} from "expo-media-library";

const FOLDER_COVERS = `${FileSystem.documentDirectory}capas`;

// hash simples do conteúdo: mesma capa => mesmo nome de arquivo
function pathHash(str: string) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16) + "-" + str.length;
}

const saveCover = async (base64: string) => {
  const fmtBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
  const uri = `${FOLDER_COVERS}${pathHash(fmtBase64)}.jpg`;

  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) {
    await FileSystem.writeAsStringAsync(uri, fmtBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }
  return uri;
};

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
    await FileSystem.makeDirectoryAsync(FOLDER_COVERS, { intermediates: true });

    for (const asset of assets) {
      const uri = await asset.getUri();

      // FILTRO: Ignora áudios do WhatsApp / fora da pasta /Music/
      if (!isRealSong(uri)) {
        continue;
      }

      const filename = await asset.getFilename();
      const rawTitle = filename.replace(/\.[^/.]+$/, "");

      let metaTitle = rawTitle;
      let metaArtist = "Artista Desconhecido";
      let metaAlbum = "Sem Álbum";
      let metaGenre = "Desconhecido";
      let metaArt = "";
      let metaDuration = 0;
      let coverUri = "";

      // Chama seu módulo nativo Kotlin
      try {
        const metadata = await AudioMetadata.getMetadata(uri);
        if (metadata) {
          if (metadata.title?.trim()) metaTitle = metadata.title.trim();
          if (metadata.artist?.trim()) metaArtist = metadata.artist.trim();
          if (metadata.album?.trim()) metaAlbum = metadata.album.trim();
          if (metadata.genre?.trim()) metaGenre = metadata.genre.trim();
          if (metadata.artwork?.trim()) metaArt = metadata.artwork.trim();
          if (metadata.duration) metaDuration = metadata.duration;
        }
      } catch (err) {
        console.warn(
          `⚠️ Não foi possível extrair metadata do arquivo ${filename}:`,
          err,
        );
      }

      if (metaArt) {
        try {
          coverUri = await saveCover(metaArt);
        } catch (err) {
          console.warn(`Nao foi possivel salvar CAPA de ${filename}: `, err);
        }
      }

      formattedSongs.push({
        id: String(asset.id),
        url: String(uri),
        title: sanitizeText(metaTitle),
        artist: sanitizeText(metaArtist),
        album: sanitizeText(metaAlbum),
        genre: sanitizeText(metaGenre),
        duration: metaDuration,
        img: coverUri,
      });
    }

    // Grava apenas as músicas limpas no SQLite
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

// Função auxiliar para reparar a acentuação e 'ç'
function sanitizeText(text?: string): string {
  if (!text) return "";
  try {
    return decodeURIComponent(escape(text));
  } catch {
    return text;
  }
}

// Função auxiliar para validar se é uma música real
function isRealSong(uri: string, durationInMs?: number): boolean {
  // 1. Ignora caminhos do WhatsApp, Telegram ou pacotes de mensagens
  const isMessengerAudio =
    uri.includes("com.whatsapp") ||
    uri.includes("WhatsApp") ||
    uri.includes("Telegram");

  // 2. Ignora arquivos .opus
  const isOpus = uri.toLowerCase().endsWith(".opus");

  // 3. Garante que está dentro do diretório /Music/
  const isInMusicFolder = uri.includes("/Music/");

  // 4. Ignora áudios com menos de 20 segundos (ex: vinhetas ou notas de voz)
  const isTooShort = durationInMs ? durationInMs < 20000 : false;

  return isInMusicFolder && !isMessengerAudio && !isOpus && !isTooShort;
}
