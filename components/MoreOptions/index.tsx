import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../Text";

interface IOption {
  label: string;
  onPress: () => void;
  icon?: React.ReactElement;
}

interface Props {
  options: IOption[];
}

export interface MoreOptionsRef {
  open: () => void;
  close: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MoreOptions = forwardRef<MoreOptionsRef, Props>(({ options }, ref) => {
  const { customTheme } = useTheme();
  const [visible, setVisible] = useState(false);

  // Posição calculada do menu na tela
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<View>(null);

  const open = () => {
    // Mede a posição exata do botão na janela do dispositivo
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      const MENU_WIDTH = 160;
      const MENU_HEIGHT = options.length * 40 + 16; // Estimativa de altura

      // Tenta posicionar à esquerda do ícone. Se faltar espaço no canto esquerdo da tela, joga para a direita
      let left = x - MENU_WIDTH;
      if (left < 10) {
        left = x + width;
      }

      // Garante que o menu não saia da borda inferior da tela
      let top = y;
      if (top + MENU_HEIGHT > SCREEN_HEIGHT - 20) {
        top = SCREEN_HEIGHT - MENU_HEIGHT - 20;
      }

      setMenuPosition({ top, left });
      setVisible(true);
    });
  };

  const close = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const handleSelectOption = (optionPress: () => void) => {
    close();
    optionPress();
  };

  return (
    <>
      <View ref={buttonRef} collapsable={false}>
        <TouchableOpacity
          onPress={open}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name="more-vert"
            size={30}
            color={customTheme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        {/* Overlay transparente cobrindo a tela inteira para fechar no clique fora */}
        <Pressable style={styles.overlay} onPress={close}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[
              styles.menuContainer,
              {
                top: menuPosition.top,
                left: menuPosition.left,
                backgroundColor: customTheme.colors.bgDefault || "#1E1E1E",
              },
            ]}
          >
            {options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => handleSelectOption(opt.onPress)}
              >
                {opt.icon}
                <Text size="sm">{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent", // Pode mudar para 'rgba(0,0,0,0.1)' se quiser um fundo sutil
  },
  menuContainer: {
    position: "absolute",
    width: 160,
    borderRadius: 8,
    paddingVertical: 6,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 8,
  },
});

export default MoreOptions;
