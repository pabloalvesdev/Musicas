// app/player/queue.tsx
import { Text, Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { usePlayerStore } from "@/stores/playerStore";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function QueueScreen() {
  // Exemplo: viria do seu estado global (Zustand ou Context)
  // const queue = usePlayerStore((state) => state.queue);
  const { queue, setQueue, play } = usePlayerStore();

  const handleSelectSong = (selectedSong: any) => {
    if (!selectedSong) return;
    // setQueue(queue); aqui nao precisa ressetar uma fila
    play(selectedSong);
  };

  return (
    <Wrapper>
      <Text size="sm" color="secondary">
        Isso aqui e customizavel
      </Text>
      <Section isContained>
        <List
          data={queue}
          listItem={(a: any) => (
            <TouchableOpacity onPress={() => handleSelectSong(a.item)}>
              <MusicItem item={a.item} />
            </TouchableOpacity>
          )}
          gap={10}
        />
      </Section>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  subtitle: { color: "#888", marginBottom: 12, fontSize: 14 },
});
