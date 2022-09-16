import * as SelectRadix from "@radix-ui/react-select";
import { Game } from "../CreateAdModal";

interface Props {
  data: Game[];
  onChange: (name: string) => void;
}

export function Select({ data, onChange }: Props) {
  return (
    <SelectRadix.Root onValueChange={onChange}>
      <SelectRadix.Trigger
        className="flex w-full justify-between items-center bg-zinc-900 px-4 py-3 rounded text-sm text-zinc-500 focus:text-white"
        aria-label="Qual o game?"
      >
        <SelectRadix.Value placeholder="Selecione o game que deseja jogar" />
        <SelectRadix.Icon />
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className="inset-0 rounded bg-[#141412] shadow-md">
          <SelectRadix.Viewport className="p-2 flex flex-col gap-2">
            {data.map((game) => (
              <SelectRadix.Item
                className="cursor-pointer flex justify-start items-center gap-3 px-5 py-1 hover:bg-zinc-800"
                value={game.id}
                key={game.id}
              >
                <SelectRadix.ItemText>
                  <div className="text-white flex justify-start items-center gap-3">
                    <img
                      src={game.banner}
                      className="w-5 h-5"
                    />
                    {game.name}
                  </div>
                </SelectRadix.ItemText>
                <SelectRadix.ItemIndicator />
              </SelectRadix.Item>
            ))}
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
}
