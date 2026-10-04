import { Text, Wrapper } from "@/components";
import List from "@/components/List";
import MoreOptions from "@/components/MoreOptions";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
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
    <Wrapper>
      <Section>
        <rn.View style={styles.row}>
          <rn.View style={styles.photo} />
          <rn.View style={{ justifyContent: "space-between" }}>
            <rn.View>
              <Text size="lg" bold>
                {artist}
              </Text>
              <Text size="sm" color="secondary">
                {data.length} Músicas
              </Text>
            </rn.View>
            <rn.View style={styles.row}>
              <rn.TouchableOpacity onPress={shufflePlay}>
                <Ionicons
                  name="shuffle"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity>
              <MoreOptions
                options={[
                  { label: "Tocar em seguida", onPress: queueNext },
                  { label: "Adicionar a fila atual", onPress: appendToQueue },
                  { label: "Adicionar a uma playlist", onPress: addToPlaylist },
                ]}
                ref={optionsRef}
              />
              {/* <rn.TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="add"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity> */}
            </rn.View>
          </rn.View>
        </rn.View>
      </Section>
      <Section height={height * 0.6} isContained>
        <List
          data={data}
          listItem={(a) => (
            <rn.TouchableOpacity onPress={() => handleSelectSong(a.item)}>
              <MusicItem item={a.item} />
            </rn.TouchableOpacity>
          )}
        />
      </Section>
    </Wrapper>
  );
  //   if (artist) {
  //   } else return null;
};

const styles = rn.StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "black",
  },
});

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
