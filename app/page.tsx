"use client"
import { useInfiniteQuery, QueryClient, dehydrate } from "@tanstack/react-query"
import { PopularMoviesResponse } from "@/app/api_resources/interfaces"
import axiosTemplate from "@/app/api_resources/config"
import { ScaleLoader } from "react-spinners"
import Image from "next/image"
import Favorite from "@/app/components/Favorite"
import Link from "next/link"
import { useSearchMovies } from "./zustand/States"
import { useEffect, useState } from "react"
import { FaAnglesDown } from "react-icons/fa6"

export default function Movies() {
  //inputValue is the controlled component value of the searchBar (which updates per character) while searchTerm is only updated onKeyPress = Enter
  const { searchTerm, inputValue } = useSearchMovies()
  const searchUrl = `/search/movie?query=${searchTerm}`
  const [apiUrl, setUrl] = useState("movie/popular")

  // this changes the api endpoint passed to the axiosTemplate function to either a search endpoint or the general one
  useEffect(() => {
    if (inputValue === "" || searchTerm === "") {
      return setUrl("movie/popular")
    }
    return setUrl(searchUrl)
  }, [searchTerm, inputValue])

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [apiUrl, searchTerm],
    queryFn: async ({ pageParam = 1 }): Promise<PopularMoviesResponse> => {
      const response = await axiosTemplate.get(apiUrl, {
        params: { page: pageParam },
      })
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  })

  const allData = data?.pages.map((page) => page.results)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#3B82F6" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        An error has occurred: {error.message}
      </div>
    )
  }

  // Function to construct TMDb image URL
  const getImageUrl = (path: string, size = "w500") => {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allData?.map((data) =>
          data.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-56">
                <Image
                  src={getImageUrl(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl cursor-pointer hover:text-blue-900 font-semibold mb-2 line-clamp-1">
                  <Link
                    href={`/${movie.id}/${movie.title
                      .replace(" ", "_")
                      .toLowerCase()}`}
                  >
                    {movie.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">
                  Release date:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-1">Rating ✨: </span>
                    <span className="font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <Favorite movie={movie} />
                </div>
              </div>
            </div>
          ))
        )}
        {hasNextPage && (
          <div className="my-4 mx-auto col-span-full">
            <button
              className="hover:text-blue-800 flex items-center gap-2 text-lg text-slate-500"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Show More "}
              <span className="animate-bounce self-end">
                <FaAnglesDown />
              </span>
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
