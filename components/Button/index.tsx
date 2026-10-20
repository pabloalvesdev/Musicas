import { darkTheme } from "@/constants/theme";
import { useMainContext } from "@/context/MainContext";
import useTheme from "@/hooks/useTheme";
import Utils from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import * as rn from "react-native";
import Text from "../Text";
import styles from "./styles";

interface IProps {
  color?: "success" | "danger" | "warning";
  small?: boolean;
  title: string; // Label identificador
  onPress: () => void; // O que o botao faz?,
  inBgPrimary?: boolean; //pro caso de o botão estar em um fundo com a cor primária, então as cores dele irão virar cor de texto
}

const Button = ({ title, onPress, inBgPrimary, color }: IProps) => {
  const { customTheme } = useTheme();
  const [press, setPress] = useState(false);
  const { primaryColor } = useMainContext();

  const getColor = useMemo(() => {
    let customColor = primaryColor;
    if (color) {
      if (color === "success") customColor = customTheme.colors.success;
      else if (color === "danger") customColor = customTheme.colors.danger;
      else if (color === "warning") customColor = customTheme.colors.warning;
    }

    return customColor;
  }, [color, primaryColor]);

  const darkPrimaryColor = useMemo(() => {
    return Utils.darkenHexColor(getColor, 0.25);
  }, [color, primaryColor]);
  const activeColor = useMemo(() => {
    if (inBgPrimary) {
      return press ? "inverse" : "primary";
    } else return "inverse";
  }, [press]);
  return (
    <rn.TouchableHighlight
      underlayColor={darkPrimaryColor}
      style={[
        styles.base,
        {
          backgroundColor: inBgPrimary
            ? darkTheme.colors.textPrimary
            : getColor,
          paddingVertical: customTheme.spacing.md,
          paddingHorizontal: customTheme.spacing.lg,
          borderRadius: customTheme.radius.lg,
        },
      ]}
      onPress={onPress}
      onShowUnderlay={() => setPress(true)}
      onHideUnderlay={() => setPress(false)}
    >
      <Text bold color={activeColor} size="md">
        {title}
      </Text>
    </rn.TouchableHighlight>
  );
};

export const RoundButton = ({ title, onPress, inBgPrimary, color }: IProps) => {
  const { customTheme } = useTheme();
  const [press, setPress] = useState(false);
  const { primaryColor } = useMainContext();

  const getColor = useMemo(() => {
    let customColor = primaryColor;
    if (color) {
      if (color === "success") customColor = customTheme.colors.success;
      else if (color === "danger") customColor = customTheme.colors.danger;
      else if (color === "warning") customColor = customTheme.colors.warning;
    }

    return customColor;
  }, [color, primaryColor]);

  const darkPrimaryColor = useMemo(() => {
    return Utils.darkenHexColor(getColor, 0.25);
  }, [color, primaryColor]);
  const activeColor = useMemo(() => {
    if (inBgPrimary) {
      return press ? "inverse" : "primary";
    } else return "inverse";
  }, [press]);
  return (
    <rn.TouchableHighlight
      underlayColor={darkPrimaryColor}
      style={[
        styles.base,
        {
          backgroundColor: inBgPrimary
            ? darkTheme.colors.textPrimary
            : getColor,
          paddingVertical: customTheme.spacing.sm,
          paddingHorizontal: customTheme.spacing.sm,
          borderRadius: customTheme.radius.full,
        },
      ]}
      onPress={onPress}
      onShowUnderlay={() => setPress(true)}
      onHideUnderlay={() => setPress(false)}
    >
      <MaterialIcons
        color={activeColor}
        size={customTheme.iconSizes.xl}
        name={title}
      />
    </rn.TouchableHighlight>
  );
};

export const TextButton = ({
  title,
  onPress,
  inBgPrimary,
  small,
  color,
}: IProps) => {
  const { primaryColor } = useMainContext();
  const [press, setPress] = useState(false);

  const activeColor = useMemo(() => {
    if (inBgPrimary) {
      return press ? "primary" : "inverse";
    } else return press ? "inverse" : "primary";
  }, [press]);
  const getColor: any = useMemo(() => {
    let customColor: "inverse" | "primary" = activeColor;
    if (color) return color;

    return customColor;
  }, [color, primaryColor, inBgPrimary, onPress]);
  return (
    <rn.TouchableOpacity style={[styles.base]} onPress={onPress}>
      <Text color={getColor} bold size={small ? "sm" : "md"}>
        {title}
      </Text>
    </rn.TouchableOpacity>
  );
};

export const OutlinedButton = ({
  title,
  onPress,
  color,
  inBgPrimary,
}: IProps) => {
  const { primaryColor } = useMainContext();
  const { customTheme } = useTheme();
  const [press, setPress] = useState(false);

  const getColorName = useMemo(() => {
    let customColor = "primary";
    if (color) customColor = color;

    return customColor;
  }, [color, primaryColor, onPress]);

  const getActiveTextColor: any = useMemo(() => {
    // if(inBgPrimary)
    // return press ? "primary" : "inverse";
    return press ? "inverse" : getColorName;
  }, [press, getColorName]);

  const getActiveBtnColor = useMemo(() => {
    let customColor = primaryColor;
    if (color === "success") customColor = customTheme.colors.success;
    else if (color === "danger") customColor = customTheme.colors.danger;
    else if (color === "warning") customColor = customTheme.colors.warning;

    if (inBgPrimary)
      return press ? customColor : customTheme.colors.textInverse;
    return press ? customTheme.colors.textInverse : customColor;
  }, [press, getColorName]);

  return (
    <rn.TouchableHighlight
      style={[
        styles.base,
        {
          borderWidth: 2,
          borderColor:
            color !== undefined ? customTheme.colors[color] : primaryColor,
          paddingVertical: customTheme.spacing.md,
          paddingHorizontal: customTheme.spacing.lg,
          borderRadius: customTheme.radius.lg,
        },
      ]}
      onPress={onPress}
      underlayColor={getActiveBtnColor}
      onShowUnderlay={() => setPress(true)}
      onHideUnderlay={() => setPress(false)}
    >
      <Text color={getActiveTextColor} bold size="md">
        {title}
      </Text>
    </rn.TouchableHighlight>
  );
};

export default Button;
