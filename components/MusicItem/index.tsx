import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { usePlayerStore } from "@/stores/playerStore";
import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Text from "../Text";
import styles from "./styles";

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
      <View style={{ flex: 1 }}>
        <Text color={isPlaying ? "primary" : "default"} size="md" bold>
          {item.title}
        </Text>
        <Text size="sm" color="secondary">
          {item.artist}
        </Text>
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
