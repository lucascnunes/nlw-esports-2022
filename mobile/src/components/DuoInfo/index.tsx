import { FunctionComponent } from "react";
import { View, Text, ColorValue } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
  separator?: string;
  extraValue?: string;
}

export function DuoInfo({ label, value, colorValue = THEME.COLORS.TEXT, separator, extraValue }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContent}>
        <Text
          numberOfLines={1}
          style={[styles.value, { color: colorValue }]}
        >
          {value}
        </Text>
        {separator ? <Text style={[styles.value, styles.separator]}>{separator}</Text> : null}
        {extraValue ? <Text style={[styles.value, { color: colorValue }]}>{extraValue}</Text> : null}
      </View>
    </View>
  );
}
