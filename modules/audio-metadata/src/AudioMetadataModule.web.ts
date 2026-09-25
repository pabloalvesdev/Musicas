import { registerWebModule, NativeModule } from 'expo';

class AudioMetadataModule extends NativeModule<{}> {}

export default registerWebModule(AudioMetadataModule, 'AudioMetadataModule');
