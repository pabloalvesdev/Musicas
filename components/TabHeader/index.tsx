// import { BottomTabHeaderProps } from "fica no lugar daeuel any ali";
import { Text } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabHeader = ({ options }: any) => {
  const { customTheme } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: customTheme.colors.bgDefault,
        paddingBottom: -Dimensions.get("screen").height, // qualquer coisa e so tirar isso
      }}
    >
      <View
        style={{
          paddingInline: customTheme.spacing.md,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: customTheme.spacing.xl,
        }}
      >
        <View>
          <Text size="lg" bold>
            {options.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <MaterialIcons
              name="settings"
              size={customTheme.iconSizes.md}
              color={customTheme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
        {/*isso aqui seria melhor confgurar em cada stack*/}
        {/* <Image
          style={{ width: 50, height: 50, borderColor: customTheme.primaryColor, borderWidth: 2, borderRadius: 50 }}
          source={{ uri: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8' }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default TabHeader;
