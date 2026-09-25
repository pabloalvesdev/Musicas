import { NativeModule, requireNativeModule } from "expo";
import type { AudioMetadata } from "./AudioMetadata.types";

declare class AudioMetadataModule extends NativeModule<{}> {
  getMetadata(uri: string): Promise<AudioMetadata>;
}

export default requireNativeModule<AudioMetadataModule>("AudioMetadata");
