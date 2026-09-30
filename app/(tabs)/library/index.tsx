import { TabComponent, Text, Wrapper } from "@/components";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const Library = () => {
  const { customTheme } = useTheme();
  const { allMusics } = useMainContext();
  const { play, setQueue } = usePlayerStore();

  const artists = [...new Set(allMusics.map((a) => a.artist))];
  const genre = [...new Set(allMusics.map((a) => a.genre))];

  const [selectedArtistQueue, setSelectedArtistQueue] = useState<
    IMusic[] | null
  >(null);
  const handleSelectSong = (selectedSong: any) => {
    if (!selectedSong || selectedArtistQueue === null) return;
    setQueue(selectedArtistQueue);
    play(selectedSong);
  };
  return (
    <Wrapper>
      <TabComponent items={["Artistas", "Genero", "Pastas (talvez)"]}>
        {/* Aba de Artistas */}
        <FlatList
          style={{ marginTop: 20 }}
          numColumns={2}
          data={artists}
          columnWrapperStyle={{
            justifyContent: "space-around", // Espaça os 2 cards na linha
            marginBottom: 16, // Espaço entre as linhas
          }}
          renderItem={(a) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/library/details",
                  params: { artist: a.item },
                })
              }
              style={[
                {
                  borderRadius: customTheme.spacing.lg,
                  width: "45%",
                  height: 150,
                  padding: 10,
                  backgroundColor: customTheme.colors.bgDark,
                },
              ]}
            >
              <Text size="md" bold>
                {a.item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Aba de Genero */}
        <FlatList
          style={{ marginTop: 20 }}
          numColumns={2}
          data={genre}
          columnWrapperStyle={{
            justifyContent: "space-around", // Espaça os 2 cards na linha
            marginBottom: 16, // Espaço entre as linhas
          }}
          renderItem={(a) => (
            <View
              style={[
                {
                  borderRadius: customTheme.spacing.lg,
                  width: "45%",
                  height: 150,
                  padding: 10,
                  backgroundColor: customTheme.colors.bgDark,
                },
              ]}
            >
              <Text size="md" bold>
                {a.item}
              </Text>
            </View>
          )}
        />

        {/* Aba que eu ainda nao sei */}
        <FlatList
          style={{ marginTop: 20 }}
          numColumns={2}
          data={["Neutre"]}
          columnWrapperStyle={{
            justifyContent: "space-around", // Espaça os 2 cards na linha
            marginBottom: 16, // Espaço entre as linhas
          }}
          renderItem={(a) => (
            <View
              style={[
                {
                  borderRadius: customTheme.spacing.lg,
                  width: "45%",
                  height: 150,
                  padding: 10,
                  backgroundColor: customTheme.colors.bgDark,
                },
              ]}
            >
              <Text size="md" bold>
                {a.item}
              </Text>
            </View>
          )}
        />
      </TabComponent>
    </Wrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16, // Espaço vertical entre as linhas
    paddingHorizontal: 16, // Margem lateral da tela
  },
  cardWrapper: {
    width: "48%", // Garante 2 itens por linha (48% + 48% + espaço sobra)
    height: 200, // Mantém a altura fixa desejada
  },
});

export default Library;
