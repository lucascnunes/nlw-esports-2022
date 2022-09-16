import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckboxProps {
  id: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ isChecked, onChange, ...rest }: CheckboxProps) {
  return (
    <CheckboxRadix.Root
      {...rest}
      checked={isChecked}
      onCheckedChange={onChange}
      className="flex rounded-lg justify-center items-center w-8 h-8 shadow-lg bg-zinc-900 hover:border-2 hover:border-violet-900"
    >
      <CheckboxRadix.Indicator className="text-emerald-400">
        <Check className="w-4 h-4" />
      </CheckboxRadix.Indicator>
    </CheckboxRadix.Root>
  );
}
