const Article = () => {
  return (
    <>
      <div className="flex flex-row items-center border-b-2 border-gray-200 pb-4 pt-8 ">
        <div className="w-1/2">
          <a href="/#" className="text-black hover:text-slate-600">
            <p className="mb-3 text-sm tracking-wide">
              Pokémon Rumble Rush Arrives Soon
            </p>
            <p className="text-[11px] text-gray-400"> 26 March 2024</p>
          </a>
        </div>
        <div className="w-1/2 ps-9">
          <img
            src="/layer_article.png"
            alt="article cover pokemon battle"
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
};
export default function ListArticle() {
  return (
    <>
      <section className="px-7 pt-8">
        <div className="flex flex-row">
          <div className="grow">
            <h3 className="text-xl font-bold tracking-wide">Pokemon News</h3>
          </div>
          <div className="place-content-center">
            <a href="/#" className="text-indigo-500 hover:text-indigo-800">
              View All
            </a>
          </div>
        </div>
        <Article></Article>
        <Article></Article>
        <Article></Article>
        <Article></Article>
      </section>
    </>
  );
}
