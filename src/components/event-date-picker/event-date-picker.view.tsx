import { CalendarIcon } from "lucide-react";
import { tv } from "tailwind-variants";

import { Calendar } from "../ui/calendar";

import type { useEventDatePicker } from "./use-event-date-picker";

const eventDatePicker = tv({
  slots: {
    root: "flex w-full flex-col gap-3",
    label: "font-display text-body-sm font-medium uppercase tracking-widest text-text-muted",
    nativeWrap: "relative lg:hidden",
    trigger: [
      "flex h-auto w-full min-h-12 items-center justify-between gap-1.5",
      "rounded-stage-sm border border-border bg-surface/60 px-4 py-3",
      "font-body text-body text-text-bright",
      "transition-colors outline-none",
      "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/40",
    ],
    triggerValue: "flex flex-1 text-left",
    triggerIcon: "pointer-events-none size-4 shrink-0 text-text-muted",
    native: "pointer-events-none absolute h-px w-px opacity-0",
    calendarWrap: [
      "hidden w-full justify-center rounded-stage-sm border border-border",
      "bg-surface-elevated/90 p-3 shadow-stage-card lg:flex",
    ],
  },
  variants: {
    empty: {
      true: { triggerValue: "text-text-muted" },
      false: { triggerValue: "text-text-bright" },
    },
  },
});

export type EventDatePickerViewProps = ReturnType<typeof useEventDatePicker>;

export function EventDatePickerView({
  content,
  value,
  minDate,
  selected,
  disabledBefore,
  startMonth,
  endMonth,
  locale,
  displayValue,
  isEmpty,
  nativeInputRef,
  onNativeChange,
  onSelect,
  openNativePicker,
}: EventDatePickerViewProps) {
  const styles = eventDatePicker({ empty: isEmpty });

  return (
    <div className={styles.root()}>
      <span className={styles.label()}>{content.label}</span>
      <div className={styles.nativeWrap()}>
        <button
          type="button"
          className={styles.trigger()}
          onClick={openNativePicker}
          aria-label={content.nativeAriaLabel}
        >
          <span className={styles.triggerValue()}>{displayValue}</span>
          <CalendarIcon className={styles.triggerIcon()} aria-hidden />
        </button>
        <input
          ref={nativeInputRef}
          type="date"
          className={styles.native()}
          value={value}
          min={minDate}
          onChange={onNativeChange}
          tabIndex={-1}
          aria-hidden
          required
        />
      </div>
      <div className={styles.calendarWrap()} role="group" aria-label={content.calendarAriaLabel}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          locale={locale}
          captionLayout="dropdown-months"
          startMonth={startMonth}
          endMonth={endMonth}
          disabled={{ before: disabledBefore }}
          className="w-full bg-transparent [--cell-size:2.5rem]"
        />
      </div>
    </div>
  );
}
