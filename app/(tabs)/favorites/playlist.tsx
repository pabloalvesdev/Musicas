import { Text, Wrapper } from "@/components";
import List from "@/components/List";
import MoreOptions from "@/components/MoreOptions";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IPlaylist, ITheme } from "@/interfaces";
import { deletePlaylist } from "@/services/playlists";
import { usePlayerStore } from "@/stores/playerStore";
import Utils from "@/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import * as rn from "react-native";
import AddMusicsModal from "./Modals/AddMusicsModal";

type Params = {
  id: string;
};

const Playlist = () => {
  const { height } = rn.useWindowDimensions();
  const { id } = useLocalSearchParams<Params>();
  const { playlists, refreshPlaylists } = useMainContext();
  const { customTheme } = useTheme();
  const styles = getStyles(customTheme);
  const nav = useNavigation();
  const { setQueue, play, queue, currentIndex } = usePlayerStore();
  const optionsRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);

  const playlist = useMemo(
    () => playlists.find((x) => x.id === id) ?? ({} as IPlaylist),
    [playlists],
  );

  const addToPlaylist = () => {};

  const deleteItem = async () => {
    await deletePlaylist(playlist);
    refreshPlaylists();
    router.back();
  };

  const handleSelectSong = (selectedSong: any) => {
    if (!selectedSong) return;
    setQueue(playlist.musics);
    play(selectedSong);
  };

  const shufflePlay = () => {
    // desordenar a lista
    var shuffledMusics = Utils.sortMusicList(playlist.musics, "shuffle");
    setQueue(shuffledMusics);
    play(shuffledMusics[0]);
  };

  const queueNext = () => {
    if (
      queue.map((a) => a.id).join(",") ===
      playlist.musics.map((a) => a.id).join(",")
    )
      return;
    queue.splice(currentIndex + 1, 0, ...playlist.musics);
    console.log(queue.map((a) => a.title));
  };

  const appendToQueue = () => {
    queue.push(...playlist.musics);
  };

  const openModal = () => setShowModal(true);

  const showOptions = () => optionsRef.current?.open();

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <rn.TouchableOpacity onPress={deleteItem}>
          <MaterialIcons
            name="delete"
            color={customTheme.colors.danger}
            size={customTheme.iconSizes.sm}
          />
        </rn.TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <AddMusicsModal
        musics={playlist.musics.map((a) => a.id)}
        visible={showModal}
        setVisible={setShowModal}
      />
      <Wrapper cStyle={{ justifyContent: "flex-end" }} noPadding>
        <Section>
          <rn.View style={styles.photo}>
            {/* <Mural list={playlist.musics} /> */}
          </rn.View>
          <rn.View
            style={{
              padding: customTheme.spacing.md,
            }}
          >
            <Text size="lg" bold>
              {playlist.name}
            </Text>
            {/* <Text size="sm" color="secondary">
              {playlist.musics.length} Músicas
            </Text> */}
          </rn.View>
        </Section>
        <rn.View style={styles.listContainer}>
          <rn.View style={styles.listButtonsContainer}>
            <rn.TouchableOpacity
              style={styles.listActionButton}
              onPress={shufflePlay}
            >
              <Ionicons
                name="shuffle"
                size={30}
                color={customTheme.colors.textPrimary}
              />
            </rn.TouchableOpacity>

            <rn.View style={styles.listActionButton}>
              <MoreOptions
                options={[
                  { label: "Tocar em seguida", onPress: queueNext },
                  { label: "Adicionar a fila atual", onPress: appendToQueue },
                  { label: "Adicionar a uma playlist", onPress: addToPlaylist },
                ]}
                ref={optionsRef}
              />
            </rn.View>
          </rn.View>
          <List
            data={playlist.musics}
            listItem={(a) => (
              <rn.TouchableOpacity onPress={() => handleSelectSong(a.item)}>
                <MusicItem item={a.item} />
              </rn.TouchableOpacity>
            )}
          />

          <rn.TouchableOpacity
            onPress={openModal}
            style={{ alignSelf: "center" }}
          >
            <Text size="sm" color="secondary">
              + Adicionar Músicas
            </Text>
          </rn.TouchableOpacity>
        </rn.View>
      </Wrapper>
    </>
  );
  //   if (artist) {
  //   } else return null;
};

const getStyles = (baseTheme: ITheme) => {
  return rn.StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 10,
    },
    listContainer: {
      height: "60%",
      width: "100%",
      padding: baseTheme.spacing.xl,
      backgroundColor: baseTheme.colors.bgDark,
      borderTopRightRadius: 60,
      borderTopLeftRadius: 60,
    },
    listActionButton: {
      backgroundColor: baseTheme.primaryColor,
      width: baseTheme.iconSizes.lg * 1.2,
      height: baseTheme.iconSizes.lg * 1.2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: baseTheme.radius.full,
    },
    listButtonsContainer: {
      position: "absolute",
      right: "10%",
      top: "-3%",
      flexDirection: "row",
      gap: baseTheme.spacing.sm,
    },
    photo: {
      alignSelf: "center",
      width: 150,
      height: 150,
      borderRadius: 20,
      borderWidth: 2,
      backgroundColor: "black",
    },
  });
};

export default Playlist;
