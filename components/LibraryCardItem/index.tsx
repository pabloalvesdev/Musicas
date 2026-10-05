import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../Text";

interface Props {
  identifier: string;
}

const LibraryCardItem = ({ identifier }: Props) => {
  const { allMusics } = useMainContext();
  const { customTheme } = useTheme();
  const items = allMusics.filter((x) => x.artist === identifier);
  const numItems = items.length <= 4 ? items.length : 4;
  const widthImg = numItems === 1 ? 100 : 50;
  const heightImg = numItems <= 2 ? 100 : 20;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/library/details",
          params: { artist: identifier },
        })
      }
      style={[
        {
          justifyContent: "flex-end",
          borderRadius: customTheme.spacing.lg,
          width: "45%",
          height: 150,
          padding: 10,
          backgroundColor: customTheme.colors.bgDark,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: customTheme.colors.bgDefault,
        }}
      >
        {numItems === 1 ? (
          <Image
            source={{
              uri: `data:image/png;base64,${items[0].img}`,
            }}
            style={{
              backgroundColor: "red",
              width: "100%",
              height: "100%",
            }}
          />
        ) : numItems === 2 ? (
          <>
            <Image
              source={{
                uri: `data:image/png;base64,${items[0].img}`,
              }}
              style={{
                backgroundColor: "red",
                width: "45%",
                height: "100%",
              }}
            />
            <Image
              source={{
                uri: `data:image/png;base64,${items[1].img}`,
              }} // parei nesse componente aqui
              style={{
                backgroundColor: "red",
                width: "45%",
                height: "100%",
              }}
            />
          </>
        ) : (
          <></>
        )}
        {/* <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-around", // Espaça os 2 cards na linha
            marginBottom: 16, // Espaço entre as linhas
          }}
          data={Array.from({ length: numItems }).map((_, index) => index)}
          renderItem={(rt) => (
            <Image
              source={{
                uri: `data:image/png;base64,${items[rt.item].img}`,
              }}
              style={{
                backgroundColor: "red",
                width: widthImg,
                height: heightImg,
              }}
            />
          )}
        /> */}
      </View>

      <View>
        <Text size="md" bold>
          {identifier}
        </Text>
        <Text color="secondary" size="xs">
          {`${items.length} Músicas`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LibraryCardItem;
