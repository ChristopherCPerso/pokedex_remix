import { Statistiques } from "~/Types/types_poke_stats";

export interface StatsProps {
  statistiques: Statistiques;
}

export function Stats({ statistiques }: StatsProps) {
  console.log(statistiques);
  return (
    <>
      <h1>Statistiques</h1>
      <div>{statistiques.base_stat}</div>
    </>
  );
}
