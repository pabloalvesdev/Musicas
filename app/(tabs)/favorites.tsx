import { Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";

function Favorites() {
  const { height } = useWindowDimensions();
  const cardHeight = height * 0.2;
  const { customTheme } = useTheme();
  const { allMusics, refreshAllMusics } = useMainContext();
  const options = useMemo(() => {
    return ["a", "b", "c"].map((a) => ({ label: a, value: a }));
  }, []);
  const [item, setItem] = useState("");

  const checkedAsFavorite = useMemo(
    () => allMusics.filter((m) => m.isFavorite === true),
    [allMusics],
  );

  const mostPlayed = useMemo(() => allMusics.slice(10, 16), [allMusics]);

  useEffect(() => {
    refreshAllMusics();
  }, [refreshAllMusics]);

  return (
    <Wrapper>
      <Section
        height={cardHeight}
        header={{
          title: "Marcados Como Gostei",
          inside: true,
        }}
        isContained
      >
        <List
          horizontal
          data={checkedAsFavorite}
          listItem={(li) => <MusicItem item={li.item} />}
        />
      </Section>

      <Section
        header={{
          title: "Mais Tocadas",
          inside: true,
        }}
        isContained
      >
        <List
          horizontal
          data={mostPlayed}
          listItem={(li) => <MusicItem item={li.item} />}
        />
      </Section>
    </Wrapper>
  );
}

export default Favorites;
