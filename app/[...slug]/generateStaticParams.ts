import { useQuery } from "@tanstack/react-query"
import { useSearchMovies } from "../zustand/States"
import axiosTemplate from "@/app/api_resources/config"
import { PopularMoviesResponse } from "../api_resources/interfaces"

export async function generateStaticParams() {
  const { searchTerm } = useSearchMovies()
  const { data } = useQuery<{ data: PopularMoviesResponse }>({
    queryKey: ["movie/popular", searchTerm],
    queryFn: async () => await axiosTemplate.get("movie/popular"),
  })
  return data?.data.results.map((post) => ({
    slug: post.id,
  }))
}
