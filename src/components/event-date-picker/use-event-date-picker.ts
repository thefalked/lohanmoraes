import { useMemo, type ChangeEventHandler } from "react";
import { ptBR } from "react-day-picker/locale";

import { eventDatePickerContent } from "./event-date-picker.content";
import {
  isoToLocalDate,
  localDateToIso,
  startOfToday,
  todayIsoDate,
} from "./event-date-picker.logic";

export type UseEventDatePickerArgs = {
  value: string;
  onChange: (isoDate: string) => void;
  minDate?: string;
};

export function useEventDatePicker({
  value,
  onChange,
  minDate = todayIsoDate(),
}: UseEventDatePickerArgs) {
  const selected = useMemo(() => isoToLocalDate(value), [value]);
  const disabledBefore = useMemo(() => isoToLocalDate(minDate) ?? startOfToday(), [minDate]);
  const startMonth = useMemo(() => {
    const base = isoToLocalDate(minDate) ?? startOfToday();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [minDate]);
  const endMonth = useMemo(() => {
    const base = startOfToday();
    return new Date(base.getFullYear() + 6, 11, 1);
  }, []);

  const onNativeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  const onSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    onChange(localDateToIso(date));
  };

  return {
    content: eventDatePickerContent,
    value,
    minDate,
    selected,
    disabledBefore,
    startMonth,
    endMonth,
    locale: ptBR,
    onNativeChange,
    onSelect,
  };
}
