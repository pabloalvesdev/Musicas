import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, View } from "react-native";
import Text from "../Text";
import getStyles from "./styles";

interface Props {
  item: IMusic;
}

// Feather tem mesmo traço/espessura e barras com alturas diferentes
const FRAMES: Array<keyof typeof Feather.glyphMap> = [
  "bar-chart-2",
  "bar-chart",
];

const MusicItem = ({ item }: Props) => {
  const { currentSong } = usePlayerStore();
  const { customTheme } = useTheme();
  const styles = getStyles(customTheme);
  const { primaryColor } = useMainContext();
  const [frameIndex, setFrameIndex] = useState(0);

  const isPlaying = useMemo(() => {
    return currentSong?.id === item.id;
  }, [currentSong, item.id]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % FRAMES.length);
    }, 500); // 550ms para um ritmo bem mais tranquilo

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <View style={[styles.card]}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: customTheme.spacing.sm,
          alignItems: "flex-start",
        }}
      >
        <View
          style={[
            styles.coverPlaceholder,
            { backgroundColor: customTheme.colors.bgDefault },
          ]}
        >
          {item.img !== undefined ? (
            <Image
              source={{ uri: `data:image/png;base64,${item.img}` }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Feather
              name="music"
              size={20}
              color={customTheme.colors.textSecondary}
            />
          )}
        </View>
        <View>
          <Text color={isPlaying ? "primary" : "default"} size="md" bold>
            {item.title}
          </Text>
          <Text size="sm" color="secondary">
            {item.artist}
          </Text>
        </View>
      </View>
      {isPlaying && (
        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <Feather name={FRAMES[frameIndex]} size={20} color={primaryColor} />
        </View>
      )}
    </View>
  );
};

export default MusicItem;
