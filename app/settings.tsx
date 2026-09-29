import { Text, Wrapper } from "@/components";
import Section from "@/components/Section";
import Switch from "@/components/Switch";
import { useMainContext } from "@/context/MainContext";
import IUserPreferences from "@/interfaces/IUserPreferences";
import { syncLocalSongsWithDB } from "@/services/files";
import { useState } from "react";
import * as rn from "react-native";

export default function Settings() {
  const {
    primaryColor,
    isDarkMode,
    userPreferences,
    updateUserPreferences,
    refreshAllMusics,
  } = useMainContext();
  const [autoplay, setAutoplay] = useState(0);

  const savePreferences = (newPreferences: IUserPreferences) => {
    updateUserPreferences(newPreferences);
  };

  const syncWithDb = async () => {
    const response = await syncLocalSongsWithDB();
    refreshAllMusics();
  };

  return (
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
            toogle={(a) =>
              savePreferences({ ...userPreferences, isDarkMode: a === 1 })
            }
          ></Switch>
        </rn.View>
      </Section>
      <Section header={{ inside: false, title: "Player" }} isShadowed>
        <rn.TouchableOpacity onPress={syncWithDb} style={styles.contRow}>
          <Text size="md" color="secondary">
            Última sincronização
          </Text>
          <Text size="sm">{new Date().toLocaleDateString("Pt-br")}</Text>
        </rn.TouchableOpacity>
        <rn.View style={styles.contRow}>
          <Text size="md" color="secondary">
            Reprodução Automática
          </Text>
          <Switch
            value={autoplay}
            toogle={(a) =>
              savePreferences({ ...userPreferences, autoPlay: a === 1 })
            }
          ></Switch>
        </rn.View>
      </Section>
    </Wrapper>
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
