import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState<boolean>(false);
  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord copiado!", `Usuário ${discord} copiado para você pesquisar por ele em seu Discord.`);
    setIsCopping(false);
  }

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
          >
            <MaterialIcons
              name="close"
              size={26}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            disabled={isCopping}
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
          >
            {isCopping ? (
              <ActivityIndicator color={THEME.COLORS.PRIMARY} />
            ) : (
              <Text style={styles.discord}>{discord}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
