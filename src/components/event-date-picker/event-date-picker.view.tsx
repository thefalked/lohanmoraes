import { tv } from "tailwind-variants";

import { Calendar } from "../ui/calendar";

import type { useEventDatePicker } from "./use-event-date-picker";

const eventDatePicker = tv({
  slots: {
    root: "flex w-full flex-col gap-3",
    label: "font-display text-body-sm font-medium uppercase tracking-widest text-text-muted",
    native: [
      "w-full rounded-stage-sm border border-border bg-surface/60 px-4 py-3",
      "font-body text-body text-text-bright lg:hidden",
      "focus-visible:border-accent focus-visible:outline-none",
    ],
    calendarWrap: [
      "hidden w-full justify-center rounded-stage-sm border border-border",
      "bg-surface-elevated/90 p-3 shadow-stage-card lg:flex",
    ],
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
  onNativeChange,
  onSelect,
}: EventDatePickerViewProps) {
  const styles = eventDatePicker();

  return (
    <div className={styles.root()}>
      <span className={styles.label()}>{content.label}</span>
      <input
        type="date"
        className={styles.native()}
        value={value}
        min={minDate}
        onChange={onNativeChange}
        aria-label={content.nativeAriaLabel}
        required
      />
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
