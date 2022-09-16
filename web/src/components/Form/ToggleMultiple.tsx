import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Tooltip from "@radix-ui/react-tooltip";

interface ToggleMultipleProps {
  days: string[];
  selectedDays: string[];
  onChangeWeekDays: (value: string[]) => void;
}
export function ToggleMultiple({ days, selectedDays, onChangeWeekDays }: ToggleMultipleProps) {
  return (
    <ToggleGroup.Root
      type="multiple"
      orientation="horizontal"
      data-orientation="horizontal"
      onValueChange={onChangeWeekDays}
    >
      {days.map((day, index) => (
        <ToggleGroup.Item
          title={day}
          value={String(index)}
          key={index}
          className={`w-8 h-12 rounded mr-1   ${
            selectedDays.includes(String(index))
              ? "bg-violet-500 hover:bg-violet-600"
              : "bg-zinc-900 hover:bg-violet-500"
          }`}
        >
          {day.split("")[0]}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
