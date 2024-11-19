import MovieDetailsContent from "@/app/components/MovieDetailsContent"

// Main page component
export default async function MovieDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Access the first slug segment
  const movieId = slug[0]

  return <MovieDetailsContent movieId={movieId} />
}
