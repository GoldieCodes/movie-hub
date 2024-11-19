import { FaRegHeart, FaHeart } from "react-icons/fa"
import { PopularMoviesData } from "../api_resources/interfaces"
import { useFavoriteMovies } from "../zustand/States"

export default function Favorite({ movie }: { movie: PopularMoviesData }) {
  const { favoritesArray, addToFavoritesArray, removeFavoriteMovie } =
    useFavoriteMovies()

  //isFavorite checks whether the movie id passed to it is in the favoritesArray or not
  function isFavorite(movieId: number) {
    return favoritesArray.some((movie) => movie.id === movieId)
  }
  const favoriteMovie = isFavorite(movie.id) //boolean variable that stores the result of the isFavorite checker function

  return (
    <span
      className="cursor-pointer text-blue-700 text-xl"
      onClick={() => {
        if (favoriteMovie) removeFavoriteMovie(movie.id)
        else addToFavoritesArray(movie)
      }}
    >
      {favoriteMovie ? <FaHeart /> : <FaRegHeart />}
    </span>
  )
}
