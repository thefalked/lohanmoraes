import { tv } from "tailwind-variants";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EventDatePicker } from "../event-date-picker";
import type { useBookingSheet } from "./use-booking-sheet";

const UNKNOWN_PACKAGE = "unknown";

const bookingSheet = tv({
  slots: {
    dialogContent: [
      "max-w-lg gap-6 border border-border bg-surface-elevated p-6 text-text-bright",
      "shadow-stage-card sm:max-w-lg lg:p-8",
    ],
    dialogHeader: "gap-2 text-left",
    dialogTitle: "font-display text-display-md font-semibold uppercase text-text-bright",
    dialogDescription: "text-body text-text",
    drawerContent: [
      "border-border bg-surface-elevated text-text-bright",
      "data-[swipe-direction=down]:rounded-t-stage",
    ],
    drawerHeader: "gap-2 text-left",
    drawerTitle: "font-display text-display-md font-semibold uppercase text-text-bright",
    drawerDescription: "text-body text-text",
    drawerBody: "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pb-2",
    drawerFooter: "border-t border-border",
    form: "flex flex-col gap-6",
    field: "flex flex-col gap-2",
    label: "font-display text-body-sm font-medium uppercase tracking-widest text-text-muted",
    trigger: [
      "h-auto w-full min-h-12 rounded-stage-sm border-border bg-surface/60 px-4 py-3",
      "font-body text-body text-text-bright",
      "focus-visible:border-accent focus-visible:ring-accent/40",
    ],
    content: [
      "z-[70] rounded-stage-sm border border-border bg-surface-elevated text-text-bright",
      "stage-scrollbar",
    ],
    item: [
      "rounded-stage-sm py-3 pl-3.5 pr-8 text-body text-text",
      "data-highlighted:bg-accent data-highlighted:text-white focus:bg-accent focus:text-white",
    ],
    submit: [
      "inline-flex w-full items-center justify-center rounded-stage-sm px-6 py-3.5",
      "bg-accent font-display text-body-sm font-semibold uppercase tracking-wide text-surface",
      "shadow-stage-card transition-all",
      "hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-40",
    ],
  },
});

export type BookingSheetViewProps = ReturnType<typeof useBookingSheet>;

function BookingForm({
  content,
  packages,
  selectedPackageId,
  setSelectedPackageId,
  eventDate,
  setEventDate,
  minDate,
  canSubmit,
  onSubmit,
  showSubmit,
}: Pick<
  BookingSheetViewProps,
  | "content"
  | "packages"
  | "selectedPackageId"
  | "setSelectedPackageId"
  | "eventDate"
  | "setEventDate"
  | "minDate"
  | "canSubmit"
  | "onSubmit"
> & { showSubmit: boolean }) {
  const styles = bookingSheet();
  const selectValue = selectedPackageId || UNKNOWN_PACKAGE;
  const packageItems = [
    { value: UNKNOWN_PACKAGE, label: content.packageUnknown },
    ...packages.map((item) => ({ value: item.id, label: item.title })),
  ];

  return (
    <form id="booking-sheet-form" className={styles.form()} onSubmit={onSubmit}>
      <div className={styles.field()}>
        <span className={styles.label()} id="booking-package-label">
          {content.packageLabel}
        </span>
        <Select
          value={selectValue}
          items={packageItems}
          onValueChange={(next) => {
            if (next == null) {
              return;
            }
            setSelectedPackageId(next === UNKNOWN_PACKAGE ? "" : String(next));
          }}
        >
          <SelectTrigger
            className={styles.trigger()}
            aria-labelledby="booking-package-label"
            size="default"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={styles.content()} alignItemWithTrigger={false} align="start">
            <SelectGroup>
              {packageItems.map((item) => (
                <SelectItem key={item.value} value={item.value} className={styles.item()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <EventDatePicker value={eventDate} onChange={setEventDate} minDate={minDate} />
      {showSubmit ? (
        <button type="submit" className={styles.submit()} disabled={!canSubmit}>
          {content.submitLabel}
        </button>
      ) : null}
    </form>
  );
}

export function BookingSheetView({
  isOpen,
  isDesktop,
  content,
  packages,
  selectedPackageId,
  setSelectedPackageId,
  eventDate,
  setEventDate,
  minDate,
  canSubmit,
  onOpenChange,
  onSubmit,
}: BookingSheetViewProps) {
  const styles = bookingSheet();
  const formProps = {
    content,
    packages,
    selectedPackageId,
    setSelectedPackageId,
    eventDate,
    setEventDate,
    minDate,
    canSubmit,
    onSubmit,
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className={styles.dialogContent()} showCloseButton>
          <DialogHeader className={styles.dialogHeader()}>
            <DialogTitle className={styles.dialogTitle()}>{content.title}</DialogTitle>
            <DialogDescription className={styles.dialogDescription()}>
              {content.description}
            </DialogDescription>
          </DialogHeader>
          <BookingForm {...formProps} showSubmit />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} showSwipeHandle swipeDirection="down">
      <DrawerContent className={styles.drawerContent()}>
        <DrawerHeader className={styles.drawerHeader()}>
          <DrawerTitle className={styles.drawerTitle()}>{content.title}</DrawerTitle>
          <DrawerDescription className={styles.drawerDescription()}>
            {content.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className={styles.drawerBody()}>
          <BookingForm {...formProps} showSubmit={false} />
        </div>
        <DrawerFooter className={styles.drawerFooter()}>
          <button
            type="submit"
            form="booking-sheet-form"
            className={styles.submit()}
            disabled={!canSubmit}
          >
            {content.submitLabel}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
