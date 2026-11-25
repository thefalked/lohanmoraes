import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingOpenOptions = {
  packageId?: string | null;
};

type BookingContextValue = {
  isOpen: boolean;
  packageId: string | null;
  openBooking: (options?: BookingOpenOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [packageId, setPackageId] = useState<string | null>(null);

  const openBooking = useCallback((options?: BookingOpenOptions) => {
    setPackageId(options?.packageId ?? null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, packageId, openBooking, closeBooking }),
    [isOpen, packageId, openBooking, closeBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
