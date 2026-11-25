import { BookingSheetView } from "./booking-sheet.view";
import { useBookingSheet } from "./use-booking-sheet";

export function BookingSheet() {
  const sheet = useBookingSheet();
  return <BookingSheetView {...sheet} />;
}
