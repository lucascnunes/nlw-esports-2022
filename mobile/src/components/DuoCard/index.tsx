import { TouchableOpacity, View, Text } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";

import { GameController } from "phosphor-react-native";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: Boolean;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  function hourStartAndEndFormated() {
    let sHourArray = data.hourStart.split(":");
    let eHourArray = data.hourEnd.split(":");

    let startHour,
      endHour = "";

    if (sHourArray[1] === "00") {
      startHour = `${String(sHourArray[0])}h`;
    } else {
      startHour = data.hourStart;
    }

    if (eHourArray[1] === "00") {
      endHour = `${String(eHourArray[0])}h`;
    } else {
      endHour = data.hourEnd;
    }
    return `${startHour} - ${endHour}`;
  }

  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de jogo"
        value={
          data.yearsPlaying === 0 ? "< 1 ano" : `${data.yearsPlaying} ano${data.yearsPlaying > 1 ? "s" : ""}`
        }
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia${data.weekDays.length > 1 ? "s" : ""}`}
        separator={"\u2022"}
        extraValue={hourStartAndEndFormated()}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity
        onPress={onConnect}
        style={styles.button}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
