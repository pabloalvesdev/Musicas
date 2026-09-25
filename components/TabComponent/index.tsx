import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import globalSyles from "@/styles/base";
import React, { ReactElement, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import Text from "../Text";
import useLocalAnimations from "./anim";
import localStyles from "./styles";

interface Props {
  noPadding?: boolean;
  onChange?: (i: number) => void;
  onStart?: () => void;
  children: React.ReactNode;
  items: string[];
}

const TabComponent = ({
  children,
  items,
  noPadding,
  onChange,
  onStart,
}: Props) => {
  const { primaryColor } = useMainContext();
  const { width } = Dimensions.get("window");
  const { customTheme } = useTheme();
  const { animatedStepStyle, puxar } = useLocalAnimations();
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    puxar(currentStep);
    //parei aqui. quando mudar o step (que vai ser o index) deve chamar animacao de puxar (vindo do anim)
  }, [currentStep, puxar]);

  return (
    <View>
      <View onLayout={onStart} style={globalSyles.row}>
        {items.map((a, i) => (
          <TouchableOpacity
            key={`item-${i}`}
            style={[
              {
                backgroundColor: customTheme.colors.bgDark,
                paddingInline: customTheme.spacing.lg,
                paddingBlock: customTheme.spacing.sm,
                borderRadius: customTheme.radius.full,
              },
              currentStep === i && { backgroundColor: primaryColor },
            ]}
            onPress={() => {
              if (onChange !== undefined) onChange(i);
              setCurrentStep(i);
            }}
          >
            <Text size="sm">{a}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View style={[localStyles.stepContainer, animatedStepStyle]}>
        {childrenArray.map((child, index) => (
          <View
            key={"child-" + index}
            style={[
              !noPadding
                ? {
                    width: width - 2 * customTheme.spacing.lg,
                    marginRight: customTheme.spacing.lg * 2,
                  }
                : { width },
            ]}
          >
            {child}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default TabComponent;

// import React from 'react';
// import { View, StyleSheet } from 'react-native';

// const CustomComponent = ({ children }) => {
//   // Garante que children seja um array
//   const childrenArray = React.Children.toArray(children);

//   return (
//     <View style={styles.container}>
//       {childrenArray.map((child, index) => {
//         // Aplica estilos diferentes com base no índice
//         let childStyle = null;

//         if (index === 0) {
//           childStyle = styles.firstChild;
//         } else if (index === 1) {
//           childStyle = styles.secondChild;
//         } else {
//           childStyle = styles.otherChild;
//         }

//         // Clona o elemento filho adicionando o estilo como prop
//         return React.cloneElement(child, {
//           style: [child.props.style, childStyle],
//           key: index,
//         });
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     padding: 10,
//   },
//   firstChild: {
//     backgroundColor: 'red',
//   },
//   secondChild: {
//     backgroundColor: 'green',
//   },
//   otherChild: {
//     backgroundColor: 'blue',
//   },
// });

// export default CustomComponent;
