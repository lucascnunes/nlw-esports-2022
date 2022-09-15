import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { GameParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { Loading } from "../../components/Loading";

import { styles } from "./styles";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute();
  const game = params as GameParams;

  const navigation = useNavigation();

  useEffect(() => {
    reloadDuos();
  }, []);

  function reloadDuos() {
    setIsLoading(true);
    fetch(`http://192.168.1.86:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
        setIsLoading(false);
      });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
          >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.spacer} />
        </View>

        <Image
          source={{ uri: game.banner }}
          style={styles.banner}
          resizeMode="cover"
        />

        <Heading
          title={game.name}
          subtitle="Conecte-se e comece a jogar!"
        />

        {duos.length === 0 ? (
          <Loading />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            contentContainerStyle={
              duos.length <= 1
                ? { marginTop: -20, flex: 1, alignItems: "center", justifyContent: "center" }
                : styles.contentList
            }
            horizontal
            data={duos}
            keyExtractor={(item) => item.id}
            onRefresh={reloadDuos}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <DuoCard
                onConnect={() => {}}
                data={item}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>Não há anúncios publicados para este jogo.</Text>
            )}
          />
        )}
      </SafeAreaView>
    </Background>
  );
}
