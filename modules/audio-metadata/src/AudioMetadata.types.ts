// Define your exported module types here.
export interface AudioMetadata {
  title: string | null;
  artist: string | null;
  album: string | null;
  albumArtist: string | null;
  genre: string | null;
  duration: number;
  year: number | null;
  trackNumber: number | null;
  discNumber: number | null;
  artwork: string | null;
}
