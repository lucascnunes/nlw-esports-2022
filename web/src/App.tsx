import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module

import "animate.css";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import "./styles/main.css";

import logoNlw from "./assets/logo-nlw-esports.svg";
import { CreateAdModal } from "./components/CreateAdModal";
import { Toaster } from "react-hot-toast";

interface Game {
  id: string;
  name: string;
  banner: string;
  _count: {
    ads: number;
  };
}

// interface ArrowProps {
//   disabled: boolean;
//   onClick: () => void;
//   left?: boolean;
//   classes: string;
// }

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    axios("http://localhost:3333/games").then((response) => {
      setTimeout(() => setGames(response.data), 1200);
    });
    setModalOpen(false);
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Toaster />
      <img
        className="w-auto"
        src={logoNlw}
        alt="Logotipo"
      />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="">
        {games.length === 0 ? (
          <div className="my-20">
            <ReactLoading
              type="spin"
              color="#fff"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 py-10">
              {games.map((game) => (
                <GameBanner
                  key={game.id}
                  image={game.banner}
                  name={game.name}
                  adsCount={game._count.ads}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog.Root
        open={modalOpen}
        onOpenChange={(open: boolean) => setModalOpen(open)}
      >
        <CreateAdBanner />
        <CreateAdModal
          reloadGames={getGames}
          data={games}
        />
      </Dialog.Root>
    </div>
  );
}

export default App;
