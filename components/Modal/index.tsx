import { useTheme } from "@/hooks";
import React, { forwardRef, JSX, useEffect, useImperativeHandle } from "react";
import * as rn from "react-native";
import Animated from "react-native-reanimated";
import Button from "../Button";
import Text from "../Text";
import useLocalAnimations from "./animations";
import localStyles from "./styles";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionButton?: () => void;
  title: string;
  headerRight?: JSX.Element;
  children: React.ReactNode;
}

const Modal = forwardRef(
  (
    { actionButton, title, headerRight, children, visible, setVisible }: Props,
    ref,
  ) => {
    const { customTheme } = useTheme();
    const { mount, unmount, animatedModalStyle } = useLocalAnimations();

    const dismiss = () => {
      unmount();
      setTimeout(() => setVisible(false), 400);
    };
    useImperativeHandle(ref, () => ({
      close: dismiss,
    }));

    const handleAction = () => {
      if (actionButton !== undefined) actionButton();
      dismiss();
    };

    useEffect(() => {
      if (visible === true) mount();
    }, [mount, visible]);
    return (
      <rn.Modal
        transparent
        visible={visible}
        statusBarTranslucent={true} // <--- ESSA É A CHAVE
        animationType="none" // "none" porque você já está usando Reanimated para animar
        onRequestClose={dismiss}
      >
        <rn.View style={[localStyles.container, { flex: 1 }]}>
          <rn.View onTouchEnd={dismiss} style={localStyles.background} />
          <Animated.View
            style={[
              localStyles.modal,
              { backgroundColor: customTheme.colors.bgDefault },
              animatedModalStyle,
            ]}
          >
            <rn.View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text size="lg" bold>
                {title}
              </Text>
              {headerRight}
            </rn.View>

            {children !== undefined && <rn.View>{children}</rn.View>}

            {actionButton !== undefined && (
              <rn.View style={localStyles.modalFooter}>
                <Button title="Salvar" onPress={handleAction} />
              </rn.View>
            )}
          </Animated.View>
        </rn.View>
      </rn.Modal>
    );
  },
);

export default Modal;
