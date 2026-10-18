import IMusic from "./IMusic";

export interface IPlaylist {
  id: number;
  name: string;
  musics: IMusic[];
}

export default IPlaylist;
