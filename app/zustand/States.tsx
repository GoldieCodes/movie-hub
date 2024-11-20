import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
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

// Interface for the Favorite Movies Page
interface FavoriteMovies {
  favoritesArray: PopularMoviesData[]
  addToFavoritesArray: (movie: PopularMoviesData) => void
  removeFavoriteMovie: (movieId: number) => void
}

export const useFavoriteMovies = create<FavoriteMovies>()(
  persist(
    (set, get) => ({
      favoritesArray: [],

      addToFavoritesArray: (movie) => {
        const currentFavorites = get().favoritesArray
        if (!currentFavorites.some((fav) => fav.id === movie.id)) {
          set({ favoritesArray: [...currentFavorites, movie] })
        }
      },

      removeFavoriteMovie: (movieId) => {
        set({
          favoritesArray: get().favoritesArray.filter(
            (movie) => movie.id !== movieId
          ),
        })
      },
    }),
    {
      name: "movieFavorites", // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)
