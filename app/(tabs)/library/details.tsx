import { Wrapper } from "@/components";
import List from "@/components/List";
import MusicItem from "@/components/MusicItem";
import { useMainContext } from "@/context/MainContext";
import { useLocalSearchParams } from "expo-router";

type Params = {
  artist?: string;
  genre?: string;
};

const Details = () => {
  const { artist, genre } = useLocalSearchParams<Params>();
  const { allMusics } = useMainContext();

  const data = allMusics.filter(
    (x) =>
      (artist !== undefined && x.artist === artist) ||
      (genre !== undefined && x.genre === genre),
  );
  return (
    <Wrapper>
      <List data={data} listItem={(a) => <MusicItem item={a.item} />} />
    </Wrapper>
  );
  //   if (artist) {
  //   } else return null;
};

export default Details;
