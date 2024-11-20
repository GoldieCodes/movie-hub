import SearchBar from "../components/SearchBar"
import Link from "next/link"
import { FaHeart } from "react-icons/fa"
import { RiMovie2Fill } from "react-icons/ri"

export default function Nav() {
  return (
    <header className="container mx-auto px-4 py-8 lg:flex items-center justify-between gap-10">
      <h1 className="text-2xl text-blue-950 logo mb-5 lg:mb-0">
        <Link
          href="/"
          className="flex items-center gap-1 tracking-tighter font-semibold"
        >
          <RiMovie2Fill />
          BloocodeMovies
        </Link>
      </h1>

      <div className="flex items-center justify-between lg:w-2/3 flex-1">
        <SearchBar />
        <span className="w-[60%]">
          <Link
            href="/favorites"
            className="hover:text-blue-900 flex items-center justify-end gap-2 lg:text-lg"
          >
            <span className="text-blue-800">
              <FaHeart />
            </span>{" "}
            Your Favorites
          </Link>
        </span>
      </div>
    </header>
  )
}
