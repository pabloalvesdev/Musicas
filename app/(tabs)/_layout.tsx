import TabHeader from "@/components/TabHeader";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { Tabs } from "expo-router";
import TabBar from "../../components/Navbar";

export default function AppTabsLayout() {
  const { isDarkMode } = useMainContext();
  const { customTheme } = useTheme();

  return (
    <Tabs
      tabBar={(props) => (
        <TabBar state={props.state} navigation={props.navigation} />
      )}
      screenOptions={{
        // headerShown: false,
        header: (props) => (
          <TabHeader
            layout={props.layout}
            navigation={props.navigation}
            options={props.options}
            route={props.route}
          />
        ),
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="library" options={{ title: "Biblioteca" }} />
    </Tabs>
  );
}
