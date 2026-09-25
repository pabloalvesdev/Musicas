import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import globalSyles from "@/styles/base";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";

interface Props {
  scroll?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
  cStyle?: StyleProp<ViewStyle>;
}

const navBarHeight = 60; //se isso aqui der algum problema no futuroi em outros dispositivos, olhar pra ca

const Wrapper = ({ children, scroll, cStyle, noPadding }: Props) => {
  const { isDarkMode } = useMainContext();
  const { customTheme } = useTheme();
  return (
    <>
      <StatusBar style={isDarkMode === 0 ? "dark" : "light"} />
      {scroll && (
        <ScrollView
          style={{
            backgroundColor: customTheme.colors.bgDefault,
            width: "100%",
            paddingInline: customTheme.spacing.md,
            height: "100%",
          }}
          contentContainerStyle={{ paddingBottom: navBarHeight }}
        >
          {children}
        </ScrollView>
      )}
      {!scroll && (
        <View
          style={[
            globalSyles.viewFullScreen,
            { backgroundColor: customTheme.colors.bgDefault },
            !noPadding && { padding: customTheme.spacing.lg },
            cStyle,
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
};

export default Wrapper;
