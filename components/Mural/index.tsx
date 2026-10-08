import { useTheme } from "@/hooks";
import { IMusic } from "@/interfaces";
import { Image, View } from "react-native";

interface Props {
  list: IMusic[];
}

const Mural = ({ list }: Props) => {
  const { customTheme } = useTheme();
  const numItems = list.length <= 4 ? list.length : 4;
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          backgroundColor: customTheme.colors.bgDefault,
        }}
      >
        {numItems === 1 ? (
          <Image
            source={{
              uri: `data:image/png;base64,${list[0].img}`,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : numItems === 2 ? (
          <>
            {list.slice(0, 2).map((it) => (
              <Image
                source={{
                  uri: `data:image/png;base64,${it.img}`,
                }}
                style={{
                  width: "49.7%",
                  height: "50%",
                }}
              />
            ))}
          </>
        ) : (
          <>
            {list.slice(0, 4).map((it) => (
              <Image
                source={{
                  uri: `data:image/png;base64,${it.img}`,
                }}
                style={{
                  width: "49.7%",
                  height: "50%",
                }}
              />
            ))}
          </>
        )}
      </View>
    </>
  );
};

export default Mural;
