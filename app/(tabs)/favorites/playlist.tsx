import { Text, Wrapper } from "@/components";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IPlaylist, ITheme } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import * as rn from "react-native";

type Params = {
  id: string;
};

const Playlist = () => {
  const { height } = rn.useWindowDimensions();
  const { id } = useLocalSearchParams<Params>();
  const { playlists } = useMainContext();
  const { customTheme } = useTheme();
  const styles = getStyles(customTheme);
  const nav = useNavigation();
  const { setQueue, play, queue, currentIndex } = usePlayerStore();
  const optionsRef = useRef<any>(null);

  const playlist = useMemo(
    () => playlists.find((x) => x.id === id) ?? ({} as IPlaylist),
    [playlists],
  );

  const addToPlaylist = () => {};

  const showOptions = () => optionsRef.current?.open();
  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <rn.TouchableOpacity
          onPress={() => console.log("Fazer funcao de deletar")}
        >
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
    <Wrapper noPadding>
      <Text size="md">{playlist.name}</Text>
      {/* <Section>
        <rn.View style={styles.photo}>
          <Mural list={data} />
        </rn.View>
        <rn.View
          style={{
            padding: customTheme.spacing.md,
          }}
        >
          <Text size="lg" bold>
            {artist}
          </Text>
          <Text size="sm" color="secondary">
            {data.length} Músicas
          </Text>
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
          data={data}
          listItem={(a) => (
            <rn.TouchableOpacity onPress={() => handleSelectSong(a.item)}>
              <MusicItem item={a.item} />
            </rn.TouchableOpacity>
          )}
        />
      </rn.View> */}
    </Wrapper>
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
