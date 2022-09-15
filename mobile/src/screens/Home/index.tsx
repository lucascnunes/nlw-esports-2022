import { useEffect, useState } from "react";
import { Image, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

import { GameCard } from "../../components/GameCard";
import { Loading } from "../../components/Loading";

interface Game {
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://192.168.1.86:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => setGames(data), 1200);
      });
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

  return (
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
          renderItem={({ item }) => <GameCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      )}
    </SafeAreaView>
  );
}
