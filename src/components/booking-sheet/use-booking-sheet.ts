import { useEffect, useState, type FormEventHandler } from "react";

import { bookingWhatsAppUrl, showPackages } from "../../data/portfolio";
import { useMediaQuery } from "../../hooks/use-media-query";
import { useBooking } from "../../providers/booking-provider";
import { todayIsoDate } from "../event-date-picker/event-date-picker.logic";
import { bookingSheetContent } from "./booking-sheet.content";

export function useBookingSheet() {
  const { isOpen, packageId, closeBooking } = useBooking();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [eventDate, setEventDate] = useState("");
  const minDate = todayIsoDate();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setSelectedPackageId(packageId ?? "");
    setEventDate("");
  }, [isOpen, packageId]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeBooking();
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!eventDate) {
      return;
    }
    const selected = showPackages.find((item) => item.id === selectedPackageId);
    const url = bookingWhatsAppUrl({
      packageTitle: selected?.title ?? null,
      eventDate,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    closeBooking();
  };

  return {
    isOpen,
    isDesktop,
    content: bookingSheetContent,
    packages: showPackages,
    selectedPackageId,
    setSelectedPackageId,
    eventDate,
    setEventDate,
    minDate,
    canSubmit: Boolean(eventDate),
    onOpenChange,
    onSubmit,
  };
}
