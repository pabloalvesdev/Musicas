import { Text } from "@/components";
import Modal from "@/components/Modal";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { createPlaylist } from "@/services/playlists";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { TextInput } from "react-native";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePlaylistModal = ({ visible, setVisible }: Props) => {
  const { playlists, primaryColor, refreshPlaylists } = useMainContext();
  const [itemName, setItemName] = useState("");
  const { customTheme } = useTheme();

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const createItem = async () => {
    const isValid = playlists.find((a) => a.name === itemName) === undefined;
    if (isValid) {
      const result = await createPlaylist({ name: itemName, musics: [] });
      refreshPlaylists();
      if (result !== undefined)
        router.navigate({
          pathname: "/(tabs)/favorites/playlist",
          params: { id: result.id },
        });
    }
  };

  const modalRef = useRef<any>(null); // Crie a referência
  return (
    <Modal
      ref={modalRef}
      title="Criar Playlist"
      visible={visible}
      setVisible={setVisible}
      actionButton={createItem}
    >
      <Text size="md">Nome</Text>
      <TextInput
        onChangeText={(a) => setItemName(a)}
        style={{
          borderBottomWidth: 2,
          borderColor: primaryColor,
          color: customTheme.colors.textPrimary,
          padding: 0,
          marginTop: customTheme.spacing.md,
        }}
      />
    </Modal>
  );
};

export default CreatePlaylistModal;
