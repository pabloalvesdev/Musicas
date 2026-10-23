import { IPlaylist } from "@/interfaces";

const Mapper = {
  mapToPlaylist: (playlistResponse: unknown[]) => {
    for (const playlist in playlistResponse) {
      if (!Object.hasOwn(playlistResponse, playlist)) continue;

      const element = playlistResponse[playlist];

      console.log(element);
    }
    return [] as IPlaylist[];
  },
};

export default Mapper;
