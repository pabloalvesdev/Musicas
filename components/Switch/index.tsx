import { useMainContext } from "@/context/MainContext";
import { useEffect, useRef } from "react";
import * as rn from "react-native";

interface IProps {
  value: number;
  toogle: (newValue: number) => void;
}

const Switch = ({ value, toogle }: IProps) => {
  const { primaryColor } = useMainContext();

  // Valor animado para a posição da bolinha (0 = esquerda, 1 = direita)
  const animValue = useRef(new rn.Animated.Value(value === 1 ? 1 : 0)).current;

  useEffect(() => {
    // Roda a animação toda vez que o 'value' mudar externamente
    rn.Animated.timing(animValue, {
      toValue: value === 1 ? 1 : 0,
      duration: 200, // velocidade da transição
      useNativeDriver: false, // false porque vamos animar propriedade de layout (marginLeft)
    }).start();
  }, [animValue, value]);

  const toggleSwitch = () => {
    toogle(value === 1 ? 0 : 1);
  };

  // Interpolação para mover a bolinha horizontalmente
  // Caixa tem 44px de largura, bolinha tem 20px -> sobra 24px de espaço livre.
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  // Interpolação para mudar a cor de fundo suavemente
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E9E9EA", primaryColor],
  });

  return (
    <rn.Pressable onPress={toggleSwitch}>
      <rn.Animated.View style={[styles.switchContainer, { backgroundColor }]}>
        <rn.Animated.View
          style={[styles.switchThumb, { transform: [{ translateX }] }]}
        />
      </rn.Animated.View>
    </rn.Pressable>
  );
};

const styles = rn.StyleSheet.create({
  switchContainer: {
    width: 46,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    // Um leve sombreado para dar profundidade no Android
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    // Sombra na bolinha para parecer física
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});

export default Switch;
