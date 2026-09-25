import { useTheme } from "@/hooks";
import { FlatList, ListRenderItem, View } from "react-native";
import Text from "../Text";

type Props<T> = {
  horizontal?: boolean;
  data: T[];
  listItem: ListRenderItem<T>;
  noData?: { text: string; imgSrc?: string };
  keyExtractor?: (item: T, index: number) => string;
  separator?: boolean;
  gap?: number;
};

function List<T>({
  data,
  listItem,
  keyExtractor,
  horizontal,
  noData,
  separator,
  gap,
}: Props<T>) {
  const { customTheme } = useTheme();
  if (data.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* {noData?.imgSrc && (
          <Image
            source={require("@/assets/images/wellcome_dark.png")}
            style={{ width: 150, height: 150 }}
          />
        )} */}
        <Text size="sm" color="secondary">
          {noData?.text || "Sem Dados"}
        </Text>
      </View>
    );
  else
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        ItemSeparatorComponent={() =>
          separator ? (
            <View
              style={{
                width: "100%",
                borderWidth: 0.3,
                borderColor: customTheme.colors.textSecondary,
              }}
            />
          ) : gap ? (
            <View style={{ width: "100%", height: gap }} />
          ) : (
            <></>
          )
        }
        style={
          {
            // backgroundColor: "red"//comentar dpois
          }
        }
        data={data}
        renderItem={listItem}
        keyExtractor={keyExtractor ?? ((_, index) => index.toString())}
      />
    );
}

export default List;
