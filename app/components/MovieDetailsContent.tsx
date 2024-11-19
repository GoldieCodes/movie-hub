"use client"

import { useQuery } from "@tanstack/react-query"
import { MovieDetailsType } from "@/app/api_resources/interfaces"
import fetchTemplate from "@/app/api_resources/config"
import { ScaleLoader } from "react-spinners"
import Image from "next/image"

export default function MovieDetailsContent({ movieId }: { movieId: string }) {
  const { isPending, error, data } = useQuery<{ data: MovieDetailsType }>({
    queryKey: ["movieDetail", movieId],
    queryFn: async () => await fetchTemplate.get(`movie/${movieId}`),
  })

  if (isPending) {
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{data?.data.title}</h1>

        <div className="relative h-72 mb-6">
          <Image
            src={getImageUrl(data?.data.backdrop_path)}
            alt={data?.data.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {data?.data.overview}
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Genres</h2>
          <ul className="flex flex-wrap gap-2">
            {data?.data.genres.map((genre) => (
              <li
                key={genre.id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
