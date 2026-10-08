import { Text, Wrapper } from "@/components";
import List from "@/components/List";
import MoreOptions from "@/components/MoreOptions";
import Mural from "@/components/Mural";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { ITheme } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import Utils from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import * as rn from "react-native";

type Params = {
  artist?: string;
  genre?: string;
};

const Details = () => {
  const { height } = rn.useWindowDimensions();
  const { artist, genre } = useLocalSearchParams<Params>();
  const { allMusics } = useMainContext();
  const { customTheme } = useTheme();
  const styles = getStyles(customTheme);
  const { setQueue, play, queue, currentIndex } = usePlayerStore();
  const optionsRef = useRef<any>(null);

  const data = allMusics.filter(
    (x) =>
      (artist !== undefined && x.artist === artist) ||
      (genre !== undefined && x.genre === genre),
  );

  const handleSelectSong = (selectedSong: any) => {
    if (!selectedSong) return;
    setQueue(data);
    play(selectedSong);
  };

  const shufflePlay = () => {
    // desordenar a lista
    var shuffledMusics = Utils.sortMusicList(data, "shuffle");
    setQueue(shuffledMusics);
    play(shuffledMusics[0]);
  };

  const queueNext = () => {
    if (queue.map((a) => a.id).join(",") === data.map((a) => a.id).join(","))
      return;
    queue.splice(currentIndex + 1, 0, ...data);
    console.log(queue.map((a) => a.title));
  };

  const appendToQueue = () => {
    queue.push(...data);
  };

  const addToPlaylist = () => {};

  const showOptions = () => optionsRef.current?.open();

  return (
    <Wrapper cStyle={{ justifyContent: "flex-end" }} noPadding>
      <Section>
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
      </rn.View>
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

export default Details;

{
  /* <Section>
  <rn.View
    style={{ flexDirection: "row", justifyContent: "space-between" }}
  >
    <rn.View style={{ flexDirection: "row", gap: 20 }}>
      <rn.View style={styles.photo} />
      <rn.View>
        <Text size="lg" bold>
          {artist}
        </Text>
        <Text size="sm" color="secondary">
          {data.length} Músicas
        </Text>
      </rn.View>
    </rn.View>
    <rn.TouchableOpacity>
      <MaterialIcons
        name="more-vert"
        size={30}
        color={customTheme.colors.textPrimary}
      />
    </rn.TouchableOpacity>
  </rn.View>
</Section> */
}
