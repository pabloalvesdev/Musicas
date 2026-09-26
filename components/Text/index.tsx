// import React, { useMemo } from "react";
// import * as rn from "react-native";
// import styles from "./styles";
// import useTheme from "@/src/hooks/useTheme";
// import { ITheme } from "@/src/interfaces";

// interface IProps {
//     children: any;
//     size: "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
//     bold?: boolean;
//     opaque?: boolean;
//     color?: "primary" | "secondary" | "inverse" | "disabled" | "danger" | "success";
//     propTheme?: ITheme;
// }

// const Text = ({ children, size, bold, opaque, color, propTheme }:IProps) => {
//     const { customTheme } = useTheme();
//     const getColorText = useMemo(()=>{
//         const refTheme = propTheme || customTheme;
//         let result = refTheme.colors.textPrimary;
//         if(color) {
//             const colArray = {
//                 "primary": refTheme.primaryColor,
//                 "secondary": refTheme.colors.textSecondary,
//                 "inverse": refTheme.colors.textInverse,
//                 "disabled": refTheme.colors.textDisabled,
//                 "success": refTheme.colors.success,
//                 "danger": refTheme.colors.danger,
//             };

//             result = colArray[color]
//         }

//         return result;
//     },[customTheme, color])

//     return <rn.Text
//         style={[
//             styles.base,
//             {
//                 opacity: opaque ? 0.5 : 1,
//                 color: getColorText,
//                 fontSize: customTheme.fontSizes[size],
//                 fontWeight: bold ? "bold" : "normal"
//             }
//         ]}
//     >{children}</rn.Text>
// }

// export default Text;

import { useMainContext } from "@/context/MainContext";
import useTheme from "@/hooks/useTheme";
import { ITheme } from "@/interfaces";
import { useMemo } from "react";
import * as rn from "react-native";
import styles from "./styles";

interface IProps {
  children: any;
  size: "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
  bold?: boolean;
  opaque?: boolean;
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

const Text = ({ children, size, bold, opaque, color, propTheme }: IProps) => {
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

  return (
    <rn.Text
      style={[
        styles.base,
        {
          opacity: opaque ? 0.5 : 1,
          color: getColorText,
          fontSize: customTheme.fontSizes[size],
          fontWeight: fontFamily,
        },
      ]}
    >
      {children}
    </rn.Text>
  );
};

export default Text;
