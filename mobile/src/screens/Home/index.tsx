import { useEffect, useState } from "react";
import { Image, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

import { GameCard } from "../../components/GameCard";
import { Loading } from "../../components/Loading";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

interface Game {
  id: string;
  name: string;
  banner: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    reloadGames();
  }, []);

  function reloadGames() {
    setIsLoading(true);
    fetch("http://192.168.1.86:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      });
  }

  function handleOpenGame(item: Game) {
    navigation.navigate("game", item);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        {games.length === 0 ? (
          <Loading />
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            onRefresh={reloadGames}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        )}
      </SafeAreaView>
    </Background>
  );
}
