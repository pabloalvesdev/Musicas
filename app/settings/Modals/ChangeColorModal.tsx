import Modal from "@/components/Modal";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import { useCallback, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeColorModal = ({ visible, setVisible }: Props) => {
  const { primaryColor, updateUserPreferences } = useMainContext();
  const [color, setColor] = useState(primaryColor);
  const { customTheme } = useTheme();

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const modalRef = useRef<any>(null); // Crie a referência

  const data = [
    "#FFD51E",
    "#FF933E",
    "#73A5CA",
    "#705EFF",
    "#3E0F8D",
    "#FF6082",
    "#FF0000",
  ];

  const saveNewColor = () => {
    updateUserPreferences({ primaryColor: color });
  };

  return (
    <Modal
      ref={modalRef}
      title="Selecionar Tema"
      visible={visible}
      setVisible={setVisible}
      actionButton={saveNewColor}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {data.map((a) => (
          <TouchableOpacity
            onPress={() => setColor(a)}
            key={a}
            style={[
              {
                height: 30,
                width: 30,
                borderRadius: 30,
                backgroundColor: a,
              },
              color === a && {
                borderColor: customTheme.colors.textPrimary,
                borderWidth: 4,
                height: 31,
                width: 31,
              },
            ]}
          />
        ))}
      </View>
    </Modal>
  );
};

export default ChangeColorModal;
