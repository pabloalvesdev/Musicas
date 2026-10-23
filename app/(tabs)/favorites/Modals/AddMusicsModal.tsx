import { Text } from "@/components";
import List from "@/components/List";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { createPlaylist } from "@/services/playlists";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMusicsModal = ({ visible, setVisible }: Props) => {
  const { playlists, primaryColor, refreshPlaylists, allMusics } =
    useMainContext();
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

  const data = useMemo(() => allMusics, []);

  return (
    <Modal
      ref={modalRef}
      title="Adicionar Músicas"
      visible={visible}
      setVisible={setVisible}
      //   actionButton={createItem}
    >
      <Section height={300}>
        <List
          listItem={(a) => <Text size="md">{a.item.title}</Text>} // colocar um botao de add nesse cara e fazer adiiconar na listagem
          data={data}
        />
      </Section>
    </Modal>
  );
};

export default AddMusicsModal;
