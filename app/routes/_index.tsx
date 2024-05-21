import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/UI/Header";
import CardNav from "~/routes/home/CardNav";
import ListArticle from "~/routes/home/ListArticle";
import SearchBar from "~/components/UI/SearchBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to the Pokedex!" },
    {
      name: "description",
      content:
        "You will found every informations about your favorites pokemons",
    },
  ];
};

export default function Index() {
  return (
    <>
      <header className="rounded-bl-3xl rounded-br-3xl bg-white pb-16">
        <Header title="What Pokemon are you looking for ?"></Header>
        <SearchBar></SearchBar>
        <nav className="grid grid-cols-2 gap-3 px-7">
          <CardNav link="/pokedex" title="Pokedex" color="bg-grass"></CardNav>
          <CardNav link="#" title="Moves" color="bg-fire"></CardNav>
          <CardNav link="#" title="Abilities" color="bg-water"></CardNav>
          <CardNav link="#" title="Items" color="bg-electric"></CardNav>
          <CardNav link="#" title="Locations" color="bg-poison"></CardNav>
          <CardNav link="#" title="Type Charts" color="bg-ground"></CardNav>
        </nav>
      </header>

      <section className="bg-slate-100">
        <ListArticle></ListArticle>
      </section>
    </>
  );
}
