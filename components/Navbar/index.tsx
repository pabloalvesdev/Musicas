// import { Text } from "@/src/components";
// import { Alert, TouchableOpacity, View } from "react-native";
// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { useTheme } from "@/src/hooks";
// import darkenHexColor from "@/src/utils/darkenHexColor";
// import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useMainContext } from "@/src/context/MainContext";
// import { lightTheme } from "@/src/constants/theme";

// const iconNames: any = {
//     home: "home",
//     settings: "settings",
//     transactions: "credit-card",
//     investiments: "timeline"
// }

// const TabBar = ({ descriptors, insets, navigation, state }: BottomTabBarProps) => {
//     const { customTheme } = useTheme();
//     const toogleToIcon = (e: any) => {
//         console.log(e)
//     }
//     return(
//         <View style={{ backgroundColor: customTheme.colors.bgDefault }}>
//             <View style={{
//                 alignSelf: "center",
//                 width: "80%",
//                 bottom: 50,
//                 paddingInline: 0,
//                 paddingBlock: 10,
//                 backgroundColor: customTheme.primaryColor,
//                 borderRadius: 20,
//                 flexDirection: "row",
//                 justifyContent: "space-around"
//             }}>
//             <View style={{ position: "absolute", height: 40, width: 40, borderRadius: 10, backgroundColor: darkenHexColor(customTheme.primaryColor, 0.3) }} />
//             {state.routes.map((route, index) => {
//                     return(
//                         <TouchableOpacity onPress={toogleToIcon} key={`${route.name} ${index}`}
//                             style={{
//                                 padding: 10,
//                                 borderRadius: 10,
//                                 backgroundColor: state.index === index ? darkenHexColor(customTheme.primaryColor, 0.3) : "none",

//                             }}
//                         >
//                             <MaterialIcons
//                                 color={lightTheme.colors.textInverse}
//                                 size={25}
//                                 name={iconNames[route.name]}
//                             />
//                         </TouchableOpacity>
//                     )
//             })}
//             </View>
//         </View>
//     )
// }

// export default TabBar;

import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useMainContext } from "@/context/MainContext";
import { usePathname } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const iconNames: any = {
  home: "home",
  library: "timeline",
};

const TabBar = ({ navigation, state }: any) => {
  const { customTheme } = useTheme();
  const { primaryColor } = useMainContext();

  const highlightX = useSharedValue(0);
  const highlightWidth = useSharedValue(40);
  const itemRefs = useRef<{ x: number; width: number }[]>([]);

  const animatedHighlightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: highlightX.value }],
    width: highlightWidth.value,
  }));

  const path = usePathname();
  const visible = useMemo(() => {
    return path.split("/").length === 2 ? "flex" : ("none" as any);
  }, [path]);

  useEffect(() => {
    const layout = itemRefs.current[state.index];
    if (layout) {
      highlightX.value = withTiming(layout.x, { duration: 150 });
      highlightWidth.value = withTiming(layout.width, { duration: 150 });
    }
  }, [state.index]);

  return (
    <View
      style={{
        backgroundColor: customTheme.colors.bgDefault,
      }}
    >
      <View
        style={{
          display: visible,
          bottom: 30, // <<< distância da parte inferior (ajusta como quiser)
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 1000, // garante que fique por cima do conteúdo
        }}
        pointerEvents="box-none" // permite interação com conteúdo atrás da tab bar
      >
        <View
          style={{
            alignSelf: "center",
            width: "60%",
            paddingVertical: 10,
            backgroundColor: customTheme.colors.bgDark,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            position: "relative",
            // sombra opcional (pode tirar se não quiser)
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {/* Destaque animado */}
          <Animated.View
            style={[
              {
                position: "absolute",
                height: 40,
                borderRadius: 10,
                backgroundColor: primaryColor,
                top: 10,
                left: 0,
                zIndex: 0,
              },
              animatedHighlightStyle,
            ]}
          />

          {/* Botões */}
          {state.routes.map((route, index) => (
            <TouchableOpacity
              key={`${route.name}-${index}`}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                itemRefs.current[index] = { x, width };

                if (state.index === index && highlightX.value === 0) {
                  highlightX.value = x;
                  highlightWidth.value = width;
                }
              }}
              onPress={() => navigation.navigate(route.name)}
              style={{
                padding: 10,
                borderRadius: 10,
                zIndex: 1,
              }}
            >
              <MaterialIcons
                color={
                  state.index == index
                    ? customTheme.colors.textInverse
                    : customTheme.colors.textPrimary
                }
                size={25}
                name={iconNames[route.name]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TabBar;
