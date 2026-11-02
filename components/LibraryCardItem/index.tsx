import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Mural from "../Mural";
import Text from "../Text";

interface Props {
  identifier: string;
  variant: "artist" | "genre";
}

const LibraryCardItem = ({ identifier, variant }: Props) => {
  const { allMusics } = useMainContext();
  const { customTheme } = useTheme();
  // const items = allMusics.filter(
  //   (x) =>
  //     (variant === "artist" && x.artist === identifier) ||
  //     (variant === "genre" && x.genre === identifier),
  // );
  const items = allMusics.filter((x) => x[variant] === identifier);
  const numItems = items.length <= 4 ? items.length : 4;
  const widthImg = numItems === 1 ? 100 : 50;
  const heightImg = numItems <= 2 ? 100 : 20;
  const componentKey = `${identifier}`;

  return (
    <TouchableOpacity
      key={componentKey}
      onPress={() =>
        router.push({
          pathname: "/library/details",
          params: { [variant]: identifier },
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
      <Mural list={items} />
      <View>
        <Text size="md" numberOfLines={1} bold>
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
