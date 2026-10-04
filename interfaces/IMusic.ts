export interface IMusic {
  id: string;
  url: string;
  title: string;
  artist: string;
  album: string;
  genre?: string;
  isFavorite?: boolean;
  duration: number;
  img?: string;
}

export default IMusic;
