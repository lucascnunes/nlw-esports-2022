import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import "./styles/main.css";

import logoNlw from "./assets/logo-nlw-esports.svg";
import { Input } from "./components/Form/Input";
import { ButtonDays } from "./components/Form/ButtonDays";
import { Checkbox } from "./components/Form/Checkbox";

interface Game {
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => setGames(data), 1200);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img
        className="w-auto"
        src={logoNlw}
        alt="Logotipo"
      />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length === 0 ? (
          <div className="col-span-6 my-20">
            <ReactLoading
              type="spin"
              color="#fff"
            />
          </div>
        ) : (
          games.map((game) => (
            <GameBanner
              key={game.id}
              image={game.banner}
              title={game.title}
              adsCount={game._count.ads}
            />
          ))
        )}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] xl:w-[600px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form
              action=""
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="game"
                  className="font-semibold"
                >
                  Qual o game?
                </label>
                <Input
                  id="game"
                  type="text"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-semibold"
                >
                  Seu nome (ou nickname)
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="yearsPlaying"
                    className="font-semibold"
                  >
                    Joga há quantos anos?
                  </label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser zero"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="discord"
                    className="font-semibold"
                  >
                    Qual seu discord?
                  </label>
                  <Input
                    id="discord"
                    type="text"
                    placeholder="Usuário#0000"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="weekDays"
                    className="font-semibold"
                  >
                    Quando costuma jogar?
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <ButtonDays title="Domingo" />
                    <ButtonDays title="Segunda" />
                    <ButtonDays title="Terça" />
                    <ButtonDays title="Quarta" />
                    <ButtonDays title="Quinta" />
                    <ButtonDays title="Sexta" />
                    <ButtonDays title="Sábado" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    htmlFor="hourStart"
                    className="font-semibold"
                  >
                    Qual horário do dia?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="hourStart"
                      type="time"
                      placeholder="De"
                    />
                    <Input
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-start items-center gap-2">
                <Checkbox id="useVoiceChannel" />
                <label
                  className="cursor-pointer"
                  htmlFor="useVoiceChannel"
                >
                  Costumo me conectar ao chat de voz
                </label>
              </div>

              <footer className="mt-6 flex justify-end items-center gap-4">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold hover:shadow-lg">
                  Cancelar
                </Dialog.Close>
                <button className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold hover:shadow-lg flex items-center gap-3">
                  <GameController className="w-6 h-6" />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
