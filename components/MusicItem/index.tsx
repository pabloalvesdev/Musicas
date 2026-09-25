import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { View } from "react-native";
import Text from "../Text";
import styles from "./styles";

interface Props {
  item: IMusic;
}

const MusicItem = ({ item }: Props) => {
  const { customTheme } = useTheme();
  return (
    <View style={[styles.card]}>
      <Text size="md" bold>
        {item.title}
      </Text>
      <Text size="sm" color="secondary">
        {item.artist}
      </Text>
    </View>
  );
};

export default MusicItem;
