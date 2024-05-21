export default function SearchBar() {
  return (
    <>
      <form className="mx-auto mb-11 max-w-md px-7">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-full bg-gray-100 p-4 ps-10 text-sm text-gray-900"
            placeholder="Search Pokemon, Move, Ability etc..."
            required
          />
        </div>
      </form>
    </>
  );
}
