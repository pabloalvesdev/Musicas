import { Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import Section from "@/components/Section";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

function Home() {
  const { customTheme } = useTheme();
  const { baseMusics, refreshBaseMusics, setIsDarkMode } = useMainContext();
  const toogleTheme = () => setIsDarkMode((prev) => (prev === 0 ? 1 : 0));
  const options = useMemo(() => {
    return ["a", "b", "c"].map((a) => ({ label: a, value: a }));
  }, []);
  const [item, setItem] = useState("");

  useEffect(() => {
    refreshBaseMusics();
  }, [refreshBaseMusics]);

  return (
    <Wrapper>
      <Section isContained>
        <List
          data={baseMusics}
          listItem={(a) => <MusicItem item={a.item} />}
          gap={10}
        />
      </Section>
    </Wrapper>
  );
}

export default Home;
