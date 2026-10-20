import IMusic from "./IMusic";

export interface IPlaylist {
  id: string;
  name: string;
  musics: IMusic[];
}

export default IPlaylist;
