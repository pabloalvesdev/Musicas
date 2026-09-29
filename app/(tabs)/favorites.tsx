import { Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { playAudio } from "@/services/player";
import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

function Favorites() {
  const { customTheme } = useTheme();
  const { allMusics, refreshAllMusics } = useMainContext();
  const options = useMemo(() => {
    return ["a", "b", "c"].map((a) => ({ label: a, value: a }));
  }, []);
  const [item, setItem] = useState("");

  useEffect(() => {
    refreshAllMusics();
  }, [refreshAllMusics]);

  return (
    <Wrapper>
      <Section isContained>
        <List
          data={allMusics}
          listItem={(a) => (
            <TouchableOpacity onPress={() => playAudio(a.item.url)}>
              <MusicItem item={a.item} />
            </TouchableOpacity>
          )}
          gap={10}
        />
      </Section>
    </Wrapper>
  );
}

export default Favorites;
