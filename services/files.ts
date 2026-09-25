import { IMusic } from "@/interfaces";
import {
  AssetField,
  MediaType,
  Query,
  requestPermissionsAsync,
} from "expo-media-library";

export async function getLocalSongs(): Promise<IMusic[]> {
  try {
    const permission = await requestPermissionsAsync(false, ["audio"]);

    if (!permission.granted) {
      alert("Precisamos de permissão para ler as músicas do seu celular!");
      return [];
    }

    const assets = await new Query()
      .eq(AssetField.MEDIA_TYPE, MediaType.AUDIO)
      .limit(500)
      .exe();

    console.log(`🎵 ${assets.length} arquivos de áudio encontrados`);

    const formattedSongs: IMusic[] = [];
    for (const asset of assets) {
      const filename = await asset.getFilename();
      const uri = await asset.getUri();
      // if (formattedSongs.length == 21) {
      //   const metadata = await AudioMetadata.getMetadata(uri);
      //   console.log("🎼 METADATA:", metadata);
      // }

      formattedSongs.push({
        id: String(asset.id),
        url: String(uri),
        title: filename.replace(/\.[^/.]+$/, ""),
        duration: 0,
        artist: "Artista Desconhecido",
      });
    }

    console.log(`🎶 ${formattedSongs.length} músicas encontradas`);

    return formattedSongs;
  } catch (error) {
    console.error("❌ Erro ao buscar arquivos de áudio:", error);
    return [];
  }
}
