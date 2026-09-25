import { useTheme } from "@/hooks";
import React from "react";
import * as rn from "react-native";
import Text from "../Text";

interface ISectionHeader {
  title: string;
  inside: boolean;
  right?: React.ReactNode;
}

interface IProps {
  children: any;
  isShadowed?: boolean;
  isContained?: boolean;
  header?: ISectionHeader;
  height?: number | "full";
}

const SectionHeader = ({ header }: { header: ISectionHeader }) => {
  const { customTheme } = useTheme();
  return (
    <rn.View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        { marginBottom: customTheme.spacing.md },
      ]}
    >
      <Text size="lg" bold>
        {header.title}
      </Text>
      {header.right}
    </rn.View>
  );
};

const Section = ({
  height,
  children,
  isContained,
  isShadowed,
  header,
}: IProps) => {
  const { customTheme } = useTheme();
  return (
    <>
      {header && !header.inside && <SectionHeader header={header} />}
      <rn.View
        style={[
          {
            width: "100%",
            borderRadius: customTheme.radius.xl,
            marginBottom: customTheme.spacing.xxl,
            padding: isContained || isShadowed ? customTheme.spacing.md : 0,
          },
          isShadowed && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          },
          isContained && { backgroundColor: customTheme.colors.bgDark },
          height != undefined &&
            typeof height === "number" && { height: height },
          height != undefined && typeof height === "string" && { flex: 1 },
        ]}
      >
        {header && header?.inside && <SectionHeader header={header} />}
        {children}
      </rn.View>
    </>
  );
};

export default Section;
