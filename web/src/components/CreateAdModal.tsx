import { FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import axios from "axios";
import toast from "react-hot-toast";

import { GameController } from "phosphor-react";

import { Input } from "./Form/Input";
// import { ButtonDays } from "./Form/ButtonDays";
import { Checkbox } from "./Form/Checkbox";
import { Select } from "./Form/Select";
import { ToggleMultiple } from "./Form/ToggleMultiple";

export interface Game {
  id: string;
  name: string;
  banner: string;
}

interface Props {
  data: Game[];
  reloadGames: () => void;
}

export function CreateAdModal({ data, reloadGames }: Props) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [game, setGame] = useState<string>();
  const [chatVoice, setChatVoice] = useState<boolean>(false);

  const daysOfTheWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  function handleSetWeekDay(value: string[]) {
    setWeekDays(value);
  }

  function handleSelectGame(name: string) {
    setGame(name);
  }

  function handleVoiceChatCheckbox(value: boolean) {
    setChatVoice(value);
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    // formData.append("weekDays", weekDays);

    try {
      axios
        .post(`http://localhost:3333/games/${game}/ads`, {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: chatVoice,
        })
        .then(() => {
          toast.success("Anúncio de duo adicionado!");
          reloadGames();
        });
    } catch (error) {
      toast.error("Não conseguimos adicionar seu anúncio de duo!");
      reloadGames();
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute rounded-lg w-[480px] xl:w-[600px] shadow-lg shadow-black/25 animate__animated animate__fadeIn animate__faster transition ease-in-out ">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form
          onSubmit={handleSubmitForm}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="game"
              className="font-semibold"
            >
              Qual o game?
            </label>
            <Select
              data={data}
              onChange={handleSelectGame}
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
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                name="yearsPlaying"
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
                name="discord"
                type="text"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="weekDays"
                className="font-semibold"
              >
                Quando costuma jogar?
              </label>
              <div className="flex flex-wrap gap-1">
                {/* Substituído com Radix ToggleGroup */}
                {/* <ButtonDays title="Domingo" />
                <ButtonDays title="Segunda" />
                <ButtonDays title="Terça" />
                <ButtonDays title="Quarta" />
                <ButtonDays title="Quinta" />
                <ButtonDays title="Sexta" />
                <ButtonDays title="Sábado" /> */}
                <ToggleMultiple
                  days={daysOfTheWeek}
                  selectedDays={weekDays}
                  onChangeWeekDays={handleSetWeekDay}
                />
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
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 flex justify-start items-center gap-2">
            <Checkbox
              isChecked={chatVoice}
              onChange={handleVoiceChatCheckbox}
              id="useVoiceChannel"
            />
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
  );
}
