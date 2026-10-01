import { Text, Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { usePlayerStore } from "@/stores/playerStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
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
  const { setQueue, play } = usePlayerStore();

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

  const tocarDEsordanadatmente = () => {};
  const tocarEMSEGUIDA = () => {};

  return (
    <Wrapper>
      <Section>
        <rn.View style={[styles.row, { justifyContent: "center", gap: 10 }]}>
          <rn.View style={styles.photo} />
          <rn.View>
            <Text size="lg">{artist}</Text>
            <Text size="sm">{data.length} Músicas</Text>
            <rn.View style={[styles.row, { justifyContent: "space-between" }]}>
              <rn.TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="playlist-add"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity>
              <rn.TouchableOpacity onPress={() => {}}>
                <Ionicons
                  name="shuffle"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity>
              <rn.TouchableOpacity onPress={() => {}}>
                <Ionicons
                  name="repeat"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity>
              <rn.TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="playlist-add"
                  size={30}
                  color={customTheme.colors.textPrimary}
                />
              </rn.TouchableOpacity>
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
