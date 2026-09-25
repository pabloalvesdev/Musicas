import { TabComponent, Text, Wrapper } from "@/components";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { FlatList, StyleSheet, View } from "react-native";

const Library = () => {
  const { customTheme } = useTheme();
  const { baseMusics } = useMainContext();
  return (
    <Wrapper>
      <TabComponent items={["Artistas", "Albuns", "Genero"]}>
        <FlatList
          style={{ marginTop: 30 }}
          numColumns={2}
          data={["Autista 1", "Autista 2", "Autista 3", "Autista 4"]}
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
          data={["Album 1", "Album 2"]}
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
