import { TabComponent, Text, Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import { Ionicons } from "@expo/vector-icons";
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
        {selectedArtistQueue === null ? (
          <FlatList
            style={{ marginTop: 30 }}
            numColumns={2}
            data={artists}
            columnWrapperStyle={{
              justifyContent: "space-around", // Espaça os 2 cards na linha
              marginBottom: 16, // Espaço entre as linhas
            }}
            renderItem={(a) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedArtistQueue(
                    allMusics.filter((t) => a.item === t.artist),
                  )
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
        ) : (
          <>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setSelectedArtistQueue(null)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={{
                  padding: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={26}
                  color={customTheme.colors.textPrimary || "#FFF"}
                />
              </TouchableOpacity>
              <Text size="md">{selectedArtistQueue[0].artist}</Text>
            </View>
            <Section isContained>
              <List
                data={selectedArtistQueue}
                listItem={(a: any) => (
                  <TouchableOpacity onPress={() => handleSelectSong(a.item)}>
                    <MusicItem item={a.item} />
                  </TouchableOpacity>
                )}
                gap={10}
              />
            </Section>
          </>
        )}

        <FlatList
          style={{ marginTop: 30 }}
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

        <FlatList
          style={{ marginTop: 30 }}
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
