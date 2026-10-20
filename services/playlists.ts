import { IPlaylist } from "@/interfaces";
import IPlaylistCreate from "@/interfaces/IPlaylistCreate";
import { createPlaylistToDB, getPlaylistsFromDB, initDatabase } from "./db";

export async function getPlaylists(): Promise<IPlaylist[]> {
  try {
    await initDatabase();
    return await getPlaylistsFromDB();
  } catch (error) {
    console.error("❌ Erro ao buscar playlists do SQLite:", error);
    return [];
  }
}

export async function createPlaylist(payload: IPlaylistCreate) {
  try {
    await initDatabase();
    const result = await createPlaylistToDB(payload);
    console.log(`💾 playlist [${result.id}]${result.name} salva no SQLite`);
    return result;
  } catch (error) {
    console.error("❌ Erro ao buscar playlists do SQLite:", error);
  }
}
// export async function syncLocalSongsWithDB(): Promise<IPlaylist[]> {
//   try {

//     const assets = await new Query()
//       .eq(AssetField.MEDIA_TYPE, MediaType.AUDIO)
//       .limit(500)
//       .exe();

//     console.log(`🎵 ${assets.length} arquivos encontrados via MediaStore`);

//     const formattedSongs: IMusic[] = [];

//     for (const asset of assets) {
//       const uri = await asset.getUri();

//       // FILTRO: Ignora áudios do WhatsApp / fora da pasta /Music/
//       if (!isRealSong(uri)) {
//         continue;
//       }

//       const filename = await asset.getFilename();
//       const rawTitle = filename.replace(/\.[^/.]+$/, "");

//       let metaTitle = rawTitle;
//       let metaArtist = "Artista Desconhecido";
//       let metaAlbum = "Sem Álbum";
//       let metaGenre = "Desconhecido";
//       let metaArt = "";
//       let metaDuration = 0;

//       // Chama seu módulo nativo Kotlin
//       try {
//         const metadata = await AudioMetadata.getMetadata(uri);
//         if (metadata) {
//           if (metadata.title?.trim()) metaTitle = metadata.title.trim();
//           if (metadata.artist?.trim()) metaArtist = metadata.artist.trim();
//           if (metadata.album?.trim()) metaAlbum = metadata.album.trim();
//           if (metadata.genre?.trim()) metaGenre = metadata.genre.trim();
//           if (metadata.artwork?.trim()) metaArt = metadata.artwork.trim();
//           if (metadata.duration) metaDuration = metadata.duration;
//         }
//       } catch (err) {
//         console.warn(
//           `⚠️ Não foi possível extrair metadata do arquivo ${filename}:`,
//           err,
//         );
//       }

//       formattedSongs.push({
//         id: String(asset.id),
//         url: String(uri),
//         title: sanitizeText(metaTitle),
//         artist: sanitizeText(metaArtist),
//         album: sanitizeText(metaAlbum),
//         genre: sanitizeText(metaGenre),
//         duration: metaDuration,
//         img: metaArt,
//       });
//     }

//     // Grava apenas as músicas limpas no SQLite
//     await saveSongsToDB(formattedSongs);
//     console.log(
//       `💾 ${formattedSongs.length} músicas com metadados salvas no SQLite`,
//     );

//     return formattedSongs;
//   } catch (error) {
//     console.error("❌ Erro ao sincronizar acervo:", error);
//     return [];
//   }
// }
