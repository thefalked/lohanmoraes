import { EventDatePickerView } from "./event-date-picker.view";
import { useEventDatePicker, type UseEventDatePickerArgs } from "./use-event-date-picker";

export function EventDatePicker(props: UseEventDatePickerArgs) {
  const picker = useEventDatePicker(props);
  return <EventDatePickerView {...picker} />;
}
