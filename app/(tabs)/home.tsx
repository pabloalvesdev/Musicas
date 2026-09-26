import { Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

function Home() {
  const { customTheme } = useTheme();
  const { baseMusics, refreshBaseMusics, setIsDarkMode } = useMainContext();

  // Pegamos o play e setQueue do seu store do player
  const { play, setQueue } = usePlayerStore();

  const toogleTheme = () => setIsDarkMode((prev) => (prev === 0 ? 1 : 0));

  const options = useMemo(() => {
    return ["a", "b", "c"].map((a) => ({ label: a, value: a }));
  }, []);

  const [item, setItem] = useState("");

  useEffect(() => {
    refreshBaseMusics();
  }, [refreshBaseMusics]);

  const handleSelectSong = (selectedSong: any) => {
    if (!selectedSong) return;
    setQueue(baseMusics);
    play(selectedSong);
  };

  return (
    <Wrapper>
      <List
        data={baseMusics}
        listItem={(a: any) => (
          <TouchableOpacity onPress={() => handleSelectSong(a.item)}>
            <MusicItem item={a.item} />
          </TouchableOpacity>
        )}
        gap={10}
      />
    </Wrapper>
  );
}

export default Home;
