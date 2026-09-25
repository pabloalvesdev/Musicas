import { Text } from "@/components";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Dimensions, View } from "react-native";

import { useTheme } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const StackHeader = ({ options }: NativeStackHeaderProps) => {
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {options.headerLeft && (
          <View style={{ position: "absolute", left: customTheme.spacing.md }}>
            <options.headerLeft />
          </View>
        )}
        <View>
          <Text size="lg" bold>
            {options.title}
          </Text>
        </View>
        {options.headerRight && (
          <View style={{ position: "absolute", right: customTheme.spacing.md }}>
            <options.headerRight />
          </View>
        )}
        {/* <View style={{ position: "absolute", right: customTheme.spacing.md }}>
          {route.name == "home" && <MaterialIcons name="notifications" color={customTheme.colors.textPrimary} size={25} />}
          {route.name == "Transactions" && }
        </View> */}{" "}
        {/*isso aqui seria melhor confgurar em cada stack*/}
        {/* <Image
          style={{ width: 50, height: 50, borderColor: customTheme.primaryColor, borderWidth: 2, borderRadius: 50 }}
          source={{ uri: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8' }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default StackHeader;
