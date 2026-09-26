import { useTheme } from "@/hooks";
import { getAudioPlayerInstance } from "@/services/player";
import { usePlayerStore } from "@/stores/playerStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function PlayerScreen() {
  const router = useRouter();
  const { customTheme } = useTheme();

  const { currentSong, isPlaying, pause, resume, nextSong, previousSong } =
    usePlayerStore();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const player = getAudioPlayerInstance();

    // O evento correto do expo-audio é "playbackStatusUpdate"
    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        // Garante que o status tem as propriedades antes de atualizar
        if (status) {
          // expo-audio fornece currentTime e duration em segundos (ou status.position)
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

  if (!currentSong) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: customTheme.colors.bgDefault },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather
            name="chevron-down"
            size={28}
            color={customTheme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={{ color: customTheme.colors.textSecondary }}>
          Nenhuma música tocando
        </Text>
      </View>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: customTheme.colors.bgDefault },
      ]}
    >
      {/* Botão de Fechar / Minimizar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather
            name="chevron-down"
            size={32}
            color={customTheme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: customTheme.colors.textSecondary },
          ]}
        >
          TOCANDO AGORA
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Capa da Música */}
      <View
        style={[
          styles.artworkContainer,
          { backgroundColor: customTheme.colors.bgDark },
        ]}
      >
        <Feather name="disc" size={140} color={customTheme.primaryColor} />
      </View>

      {/* Título e Artista */}
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: customTheme.colors.textPrimary }]}
        >
          {currentSong.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.artist, { color: customTheme.colors.textSecondary }]}
        >
          {currentSong.artist}
        </Text>
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressSection}>
        <View
          style={[
            styles.progressBarBg,
            { backgroundColor: "rgba(255,255,255,0.1)" },
          ]}
        >
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

        <View style={styles.timeRow}>
          <Text
            style={{ color: customTheme.colors.textSecondary, fontSize: 12 }}
          >
            {formatTime(currentTime)}
          </Text>
          <Text
            style={{ color: customTheme.colors.textSecondary, fontSize: 12 }}
          >
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      {/* Controles de Áudio */}
      <View style={styles.controlsRow}>
        <TouchableOpacity onPress={previousSong}>
          <Feather
            name="skip-back"
            size={36}
            color={customTheme.colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (isPlaying ? pause() : resume())}
          style={[
            styles.playButton,
            { backgroundColor: customTheme.primaryColor },
          ]}
        >
          <Feather name={isPlaying ? "pause" : "play"} size={32} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSong}>
          <Feather
            name="skip-forward"
            size={36}
            color={customTheme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  backButton: {
    padding: 4,
  },
  artworkContainer: {
    width: 260,
    height: 260,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  artist: {
    fontSize: 16,
    marginTop: 6,
    textAlign: "center",
  },
  progressSection: {
    width: "100%",
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
