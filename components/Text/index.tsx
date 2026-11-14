import { useMainContext } from "@/context/MainContext";
import useTheme from "@/hooks/useTheme";
import { ITheme } from "@/interfaces";
import { useEffect, useMemo, useRef, useState } from "react";
import * as rn from "react-native";
import styles from "./styles";

interface IProps {
  children: any;
  size: "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
  bold?: boolean;
  opaque?: boolean;
  marquee?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "inverse"
    | "disabled"
    | "danger"
    | "success"
    | "warning"
    | "default";
  propTheme?: ITheme;
}

const Text = ({
  children,
  size,
  bold,
  opaque,
  marquee,
  color,
  propTheme,
}: IProps) => {
  const { customTheme } = useTheme();
  const { primaryColor } = useMainContext();

  const getColorText = useMemo(() => {
    const refTheme = propTheme || customTheme;
    let result = refTheme.colors.textPrimary;
    if (color) {
      const colArray = {
        primary: primaryColor,
        secondary: refTheme.colors.textSecondary,
        inverse: refTheme.colors.textInverse,
        disabled: refTheme.colors.textDisabled,
        success: refTheme.colors.success,
        danger: refTheme.colors.danger,
        warning: refTheme.colors.warning,
        default: refTheme.colors.textPrimary,
      };

      result = colArray[color];
    }

    return result;
  }, [customTheme, color, primaryColor]);

  // ⚠️ Aqui é onde trocamos o fontFamily com base no "bold"
  const fontFamily = bold ? "bold" : "normal";

  const textStyle = [
    styles.base,
    {
      opacity: opaque ? 0.5 : 1,
      color: getColorText,
      fontSize: customTheme.fontSizes[size],
      fontWeight: fontFamily,
    },
  ];

  const VELOCITY = 40;
  const PAUSE = 1500;

  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const x = useRef(new rn.Animated.Value(0)).current;

  const needRoll =
    !!marquee && containerWidth > 0 && textWidth > containerWidth;

  useEffect(() => {
    x.setValue(0);
    if (!needRoll) return;

    const distancia = textWidth - containerWidth;
    const duracao = (distancia / VELOCITY) * 1000;

    const anim = rn.Animated.loop(
      rn.Animated.sequence([
        rn.Animated.delay(PAUSE),
        rn.Animated.timing(x, {
          toValue: -distancia,
          duration: duracao,
          easing: rn.Easing.linear,
          useNativeDriver: true,
        }),
        rn.Animated.delay(PAUSE),
        rn.Animated.timing(x, {
          toValue: 0,
          duration: duracao,
          easing: rn.Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [needRoll, textWidth, containerWidth, children]);

  if (marquee) {
    return (
      <rn.View
        style={{ overflow: "hidden" }}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <rn.Animated.View
          style={{
            flexDirection: "row",
            width: 10000, // largura enorme só para medir o texto sem quebrar
            transform: [{ translateX: x }],
          }}
        >
          <rn.Text
            numberOfLines={1}
            style={textStyle}
            onLayout={(e) =>
              setTextWidth(Math.ceil(e.nativeEvent.layout.width))
            }
          >
            {children}
          </rn.Text>
        </rn.Animated.View>
      </rn.View>
    );
  }

  return <rn.Text style={textStyle}>{children}</rn.Text>;
};

export default Text;
