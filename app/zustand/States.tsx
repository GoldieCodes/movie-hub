import { create } from "zustand"
import { PopularMoviesData } from "../api_resources/interfaces"

// BELOW IS THE INTERFACE AND STATES FOR THE SEARCH MOVIES LOGIC
interface SearchState {
  searchTerm: string
  updateSearch: (input: string) => void
  inputValue: string
  updateValue: (value: string) => void
}

export const useSearchMovies = create<SearchState>((set) => ({
  searchTerm: "",
  updateSearch: (input) => set({ searchTerm: input }),
  inputValue: "",
  updateValue: (value) => set({ inputValue: value }),
}))

// BELOW IS THE INTERFACE AND STATES FOR THE FAVORITE MOVIES PAGES AND LOGIC
interface FavoriteMovies {
  favoritesArray: PopularMoviesData[]
  addToFavoritesArray: (movie: PopularMoviesData) => void
  removeFavoriteMovie: (movieId: number) => void
  setFavoritesArray: (array: PopularMoviesData[]) => void
}

export const useFavoriteMovies = create<FavoriteMovies>((set) => ({
  favoritesArray: [],
  addToFavoritesArray: (movie) =>
    set((state) => {
      // Check if the movie already exists in the favorites
      if (!state.favoritesArray.some((fav) => fav.id === movie.id)) {
        // Add the movie if it's not already in the array
        return { favoritesArray: [...state.favoritesArray, movie] }
      }
      // Return unchanged state if the movie already exists
      return state
    }),
  removeFavoriteMovie: (movieId: number) =>
    set((state) => ({
      favoritesArray: state.favoritesArray.filter(
        (movie) => movie.id !== movieId
      ),
    })),
  setFavoritesArray: (array) => set({ favoritesArray: array }),
}))
