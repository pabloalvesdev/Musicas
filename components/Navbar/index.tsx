import { useTheme } from "@/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useMainContext } from "@/context/MainContext";
import { usePathname } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const iconNames: Record<string, string> = {
  home: "home", // Casinha em linhas finas
  library: "disc", // Disco de vinil minimalista
  favorites: "heart", // Coração em contorno fino
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
          bottom: 30,
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 1000,
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            alignSelf: "center",
            width: "60%",
            paddingVertical: 10,
            backgroundColor: customTheme.colors.bgDefault,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            position: "relative",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {/* Sublinhado animado */}
          <Animated.View
            style={[
              {
                position: "absolute",
                height: 3, // <<< Espessura da linha
                borderRadius: 2, // <<< Pontas ligeiramente arredondadas
                backgroundColor: primaryColor, // <<< Cor primária da marca
                bottom: 4, // <<< Posiciona rente ao rodapé da tab bar
                left: 0,
                zIndex: 1,
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
                zIndex: 2,
              }}
            >
              <MaterialCommunityIcons
                color={
                  state.index === index
                    ? primaryColor // <<< Ícone ativo ganha a cor primária
                    : customTheme.colors.textPrimary // <<< Ícone inativo fica padrão
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
