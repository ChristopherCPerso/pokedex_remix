const colors = {
  transparent: "transparent",
  grass: "#2CDAB1",
  fire: "#FF8D82",
  water: "#77C4FE",
  electric: "#F6C747",
  poison: "#A06EB4",
  ground: "#D1938C",
  bug: "#2F915A",
  normal: "#939292",
  ice: "#58E4FD",
  fighting: "#8D3524",
  flying: "#00C1ED",
  psychic: "#980ADA",
  rock: "#867966",
  ghost: "#4C0203",
  dragon: "#D1AB2C",
  dark: "#203852",
  steel: "#828D93",
  fairy: "#FF3EA7",
} as const;

export type ThemeColors =
  | "transparent"
  | "grass"
  | "fire"
  | "water"
  | "electric"
  | "poison"
  | "ground"
  | "bug"
  | "normal"
  | "ice"
  | "fighting"
  | "flying"
  | "psychic"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export default colors;
