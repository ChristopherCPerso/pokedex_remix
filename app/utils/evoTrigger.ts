import { EvolutionDetail } from "pokenode-ts";

export default function aboutEvo(detail: EvolutionDetail) {
  switch (detail.trigger.name != null) {
    case detail.min_level != null:
      return `Lvl ${detail.min_level}`;
    case detail.min_happiness != null:
      return `Happiness : ${detail.min_happiness}`;
    case detail.location?.name != null:
      return `${detail.location?.name}`;
    case detail.known_move_type?.name != null:
      return `Move : ${detail.known_move_type?.name}`;
    case detail.item?.name != null:
      return `${detail.item?.name}`;
  }
}
