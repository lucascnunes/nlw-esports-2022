import * as Tooltip from "@radix-ui/react-tooltip";
import { InputHTMLAttributes } from "react";

interface ButtonDaysProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function ButtonDays(props: ButtonDaysProps) {
  return (
    <Tooltip.Provider delayDuration={50}>
      <Tooltip.Root>
        <Tooltip.Trigger
          type="button"
          className="w-8 h-8 xl:h-12 rounded bg-zinc-900 hover:bg-violet-500"
        >
          {props.title.split("")[0]}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            avoidCollisions={true}
            aria-label={props.title}
            hideWhenDetached={true}
            className="shadow p-2 rounded bg-zinc-900 text-gray-200 animate-bounce"
            sideOffset={5}
          >
            <Tooltip.Arrow />
            {props.title}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
