/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetBooksQuery(undefined);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedPublicationYear, setSelectedPublicationYear] =
    useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGenre(event.target.value);
  };

  const handlePublicationYearFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPublicationYear(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const filteredBooks = data?.data
    ?.filter((book: IBook) => {
      const genreMatch = selectedGenre === "" || book.genre === selectedGenre;

      const publicationYearMatch =
        selectedPublicationYear === "" ||
        book.publicationDate === selectedPublicationYear;

      const searchMatch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase());

      return genreMatch && publicationYearMatch && searchMatch;
    })
    .slice(-10);

  return (
    <>
      <div className="grid mt-5 grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {filteredBooks?.map((book: IBook) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title, Author, Genre"
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          {/* Genre filter */}
          <div>
            <label htmlFor="genre-filter" className="block font-medium mb-1">
              Filter by Genre
            </label>
            <select
              id="genre-filter"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              value={selectedGenre}
              onChange={handleGenreFilterChange}
            >
              <option value="">{}All Genres</option>
              {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data?.data?.map((book: IBook) => (
                  <option key={book?._id} value={book?.genre}>
                    {book.genre}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Publication Year filter */}
          <div>
            <label
              htmlFor="publication-year-filter"
              className="block font-medium mb-1"
            >
              Filter by Publication Year
            </label>
            <input
              type="text"
              id="publication-year-filter"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              placeholder="Enter publication year"
              value={selectedPublicationYear}
              onChange={handlePublicationYearFilterChange}
            />
          </div>
          <Link to="add-new-book">
            <button className="btn mt-8 ml-4 btn-outline btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
              Add New
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
