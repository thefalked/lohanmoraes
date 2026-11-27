import { useMemo, useRef, type ChangeEventHandler } from "react";
import { ptBR } from "react-day-picker/locale";

import { eventDatePickerContent } from "./event-date-picker.content";
import {
  formatIsoDateDisplay,
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
  const nativeInputRef = useRef<HTMLInputElement>(null);
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

  const displayValue = formatIsoDateDisplay(value, eventDatePickerContent.emptyDisplay);
  const isEmpty = !parseableValue(value);

  const onNativeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  const onSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    onChange(localDateToIso(date));
  };

  const openNativePicker = () => {
    const input = nativeInputRef.current;
    if (!input) {
      return;
    }
    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }
    } catch {
      // Fall through to click/focus for browsers that block showPicker.
    }
    input.focus();
    input.click();
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
    displayValue,
    isEmpty,
    nativeInputRef,
    onNativeChange,
    onSelect,
    openNativePicker,
  };
}

function parseableValue(isoDate: string): boolean {
  return Boolean(isoToLocalDate(isoDate));
}
