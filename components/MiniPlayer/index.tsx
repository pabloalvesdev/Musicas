import { useTheme } from "@/hooks";
import { getAudioPlayerInstance } from "@/services/player";
import { usePlayerStore } from "@/stores/playerStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MiniPlayer() {
  const router = useRouter();
  const { customTheme } = useTheme();

  const { currentSong, isPlaying, pause, resume, nextSong } = usePlayerStore();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Escuta o progresso de tempo real
  useEffect(() => {
    if (!currentSong) return;

    const player = getAudioPlayerInstance();

    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status) {
          const current = status.currentTime ?? (status as any).position ?? 0;
          const total = status.duration ?? currentSong?.duration ?? 0;

          setCurrentTime(current);
          setDuration(total);
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [currentSong]);

  const progressPercent =
    currentSong && duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleContainerPress = () => {
    // Só navega para o player expandido se houver uma música selecionada
    if (currentSong) {
      router.push("/player");
    }
  };

  return (
    <Pressable
      onPress={handleContainerPress}
      style={[
        styles.container,
        {
          backgroundColor: customTheme.colors.bgDark,
          borderColor: customTheme.colors.bgDark,
        },
      ]}
    >
      {/* 1. Progressbar Fina no Topo */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${progressPercent}%`,
              backgroundColor: customTheme.primaryColor,
            },
          ]}
        />
      </View>

      <View style={styles.contentRow}>
        {/* 2. Ícone da Música / Artwork Placeholder */}
        <View
          style={[
            styles.coverPlaceholder,
            { backgroundColor: customTheme.colors.bgDefault },
          ]}
        >
          <Feather
            name="music"
            size={20}
            color={
              currentSong
                ? customTheme.primaryColor
                : customTheme.colors.textSecondary
            }
          />
        </View>

        {/* 3. Título e Artista (Com estado Padrão) */}
        <View style={styles.textSection}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: customTheme.colors.textPrimary }]}
          >
            {currentSong ? currentSong.title : "Nenhuma música em execução"}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.artist, { color: customTheme.colors.textSecondary }]}
          >
            {currentSong
              ? currentSong.artist
              : "Selecione uma faixa para ouvir"}
          </Text>
        </View>

        {/* 4. Ações Rápidas */}
        <View style={styles.actionsRow}>
          {/* Play / Pause */}
          <TouchableOpacity
            disabled={!currentSong}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => (isPlaying ? pause() : resume())}
            style={[styles.actionButton, !currentSong && { opacity: 0.4 }]}
          >
            <Feather
              name={isPlaying ? "pause" : "play"}
              size={22}
              color={customTheme.colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Avançar Próxima Música */}
          <TouchableOpacity
            disabled={!currentSong}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={nextSong}
            style={[styles.actionButton, !currentSong && { opacity: 0.4 }]}
          >
            <Feather
              name="skip-forward"
              size={22}
              color={customTheme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    borderTopWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  progressBarBackground: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  progressBarFill: {
    height: "100%",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  coverPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  artist: {
    fontSize: 12,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 2,
  },
});
