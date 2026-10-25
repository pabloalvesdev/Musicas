import { Text } from "@/components";
import List from "@/components/List";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IMusic, IPlaylist } from "@/interfaces";
import { addToPlaylist } from "@/services/playlists";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  playlistId: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMusicsModal = ({ visible, setVisible, playlistId }: Props) => {
  const { playlists, primaryColor, refreshPlaylists, allMusics } =
    useMainContext();
  const [itemName, setItemName] = useState("");
  const { customTheme } = useTheme();

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const modalRef = useRef<any>(null); // Crie a referência

  const playlist = useMemo(
    () => playlists.find((x) => x.id === playlistId) ?? ({} as IPlaylist),
    [playlists],
  );
  const data = useMemo(
    () =>
      allMusics.filter(
        (x) => !playlist?.musics.map((a) => a.id).includes(x.id),
      ),
    [allMusics, playlist],
  );

  const appendItem = (payload: IMusic) => {
    addToPlaylist(playlistId, payload.id);
    refreshPlaylists();
  };

  return (
    <Modal
      ref={modalRef}
      title="Adicionar Músicas"
      visible={visible}
      setVisible={setVisible}
    >
      <Section height={300}>
        <List
          gap={10}
          listItem={(a) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "90%" }}>
                <Text numberOfLines={1} size="sm">
                  {a.item.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => appendItem(a.item)}
                style={{ width: "10%" }}
              >
                <MaterialIcons name="add" size={customTheme.iconSizes.md} />
              </TouchableOpacity>
            </View>
          )} // colocar um botao de add nesse cara e fazer adiiconar na listagem
          data={data}
        />
      </Section>
    </Modal>
  );
};

export default AddMusicsModal;
