import IMusic from "./IMusic";

export interface IPlaylistCreate {
  name: string;
  musics: IMusic[];
}

export default IPlaylistCreate;
