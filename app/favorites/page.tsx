"use client"
import { useFavoriteMovies } from "../zustand/States"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Favorite from "../components/Favorite"

export default function Favorites() {
  const { favoritesArray, setFavoritesArray } = useFavoriteMovies()

  //this useeffect runs once the component mounts and sets the favoritesArray to the contents in local storage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("movieFavorites")
    if (storedFavorites) {
      setFavoritesArray(JSON.parse(storedFavorites))
    }
  }, [])

  //this ensures to always overwrite the previous local storage value with the new instance of the favoritesArray as it changes
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favoritesArray))
  }, [favoritesArray])

  // Function to construct TMDb image URL
  const getImageUrl = (path: string, size = "w500") => {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Favorites
      </h1>

      {favoritesArray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritesArray.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={getImageUrl(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-700 transition-colors">
                  <Link href={`/${movie.id}`} className="line-clamp-1">
                    {movie.title}
                  </Link>
                </h2>
                <p className="text-gray-600 italic">
                  Release Date:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <span>✨</span>
                    <span className="font-bold text-lg">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <Favorite movie={movie} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-100 rounded-xl p-8 space-y-4">
          <p className="text-xl text-gray-600">
            You haven't added any favorite movies yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Explore Movies
          </Link>
        </div>
      )}
    </main>
  )
}
