import { Text, Wrapper } from "@/components";
import Section from "@/components/Section";
import Switch from "@/components/Switch";
import { useMainContext } from "@/context/MainContext";
import { useTheme } from "@/hooks";
import IUserPreferences from "@/interfaces/IUserPreferences";
import { syncLocalSongsWithDB } from "@/services/files";
import { getLastSync, saveLastSync } from "@/services/userPreferences";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import * as rn from "react-native";
import ChangeColorModal from "./Modals/ChangeColorModal";

export default function Settings() {
  const {
    primaryColor,
    autoPlay,
    isDarkMode,
    userPreferences,
    updateUserPreferences,
    refreshAllMusics,
    setLoad,
    load,
  } = useMainContext();
  const { customTheme } = useTheme();
  const [showChangeColorModal, setShowChangeColorModal] = useState(false);

  const savePreferences = (newPreferences: Partial<IUserPreferences>) => {
    updateUserPreferences(newPreferences);
  };

  const syncWithDb = async () => {
    setLoad(true);
    await syncLocalSongsWithDB();
    saveLastSync();
    refreshAllMusics();
    setLoad(false);
  };

  const openChangeColorModal = () => setShowChangeColorModal(true);
  const lastSync = useMemo(() => {
    return getLastSync();
  }, []);

  return (
    <>
      <ChangeColorModal
        visible={showChangeColorModal}
        setVisible={setShowChangeColorModal}
      />
      <Wrapper>
        <Section
          isContained
          header={{ title: "Personalização", inside: false }}
          isShadowed
        >
          <rn.View style={styles.contRow}>
            <Text size="md" color="secondary">
              Cor
            </Text>
            <rn.TouchableOpacity
              onPress={openChangeColorModal}
              style={[
                styles.primaryColorButton,
                { backgroundColor: primaryColor },
              ]}
            ></rn.TouchableOpacity>
          </rn.View>
          <rn.View style={styles.contRow}>
            <Text size="md" color="secondary">
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              toogle={(a) => savePreferences({ isDarkMode: a === 1 })}
            ></Switch>
          </rn.View>
        </Section>
        <Section header={{ inside: false, title: "Player" }} isShadowed>
          <rn.TouchableOpacity
            disabled={load}
            onPress={syncWithDb}
            style={styles.contRow}
          >
            <Text size="md" color="secondary">
              Última sincronização
            </Text>
            {load ? (
              <rn.ActivityIndicator color={customTheme.colors.textSecondary} />
            ) : (
              <Text size="sm">
                {lastSync === ""
                  ? "Nunca"
                  : formatDistanceToNow(lastSync, {
                      addSuffix: true, // Adiciona o "há" na frente
                      locale: ptBR,
                    })}
              </Text>
            )}
          </rn.TouchableOpacity>
          <rn.View style={styles.contRow}>
            <Text size="md" color="secondary">
              Reprodução Automática
            </Text>
            <Switch
              value={autoPlay}
              toogle={(a) => savePreferences({ autoPlay: a === 1 })}
            ></Switch>
          </rn.View>
        </Section>
      </Wrapper>
    </>
  );
}

const styles = rn.StyleSheet.create({
  contRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  primaryColorButton: {
    borderRadius: 30,
    width: 30,
    height: 30,
  },
});
