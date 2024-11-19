import SearchBar from "../components/SearchBar"
import Link from "next/link"
import { FaHeart } from "react-icons/fa"
import { RiMovie2Fill } from "react-icons/ri"

export default function Nav() {
  return (
    <header className="flex items-center justify-between gap-10 m-3 lg:m-6">
      <h1 className="text-2xl text-blue-950 logo">
        <Link
          href="/"
          className="flex items-center gap-1 tracking-tighter font-semibold"
        >
          <RiMovie2Fill />
          BloocodeMovies
        </Link>
      </h1>

      <SearchBar />
      <Link
        href="/favorites"
        className="hover:text-blue-900 flex items-center gap-2"
      >
        <FaHeart /> Your Favorites
      </Link>
    </header>
  )
}
