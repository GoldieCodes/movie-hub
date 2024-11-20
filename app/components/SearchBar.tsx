"use client"
import { ImSearch } from "react-icons/im"
import { useSearchMovies } from "@/app/zustand/States"

export default function SearchBar() {
  const { updateSearch, inputValue, updateValue } = useSearchMovies()

  function getInputValue(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      updateSearch(inputValue)
    }
  }

  return (
    <div className="relative flex items-center max-w-md w-full">
      <ImSearch className="absolute left-3 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search movies..."
        className="gradient-ring w-4/5 lg:w-full border-[1px] border-gray-300 pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none transition-colors"
        value={inputValue}
        onChange={(e) => updateValue(e.target.value)}
        onKeyDown={(e) => getInputValue(e)}
      />
    </div>
  )
}
