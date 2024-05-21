import { EvolutionDetail } from "pokenode-ts";
import { TimeOfDay } from "~/Types/types_poke_evolution";

export default function evoTime(detail: EvolutionDetail) {
  let time;
  if (detail.time_of_day != TimeOfDay.Empty) {
    time =
      detail.time_of_day === "Night"
        ? `By ${TimeOfDay.Night}`
        : `By ${TimeOfDay.Day}`;
  }
  return time;
}
