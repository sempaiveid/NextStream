import { Metadata } from "next";

import { movieApi, MovieDetailsPage } from "@/entities/movie";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseId(slug: string): number {
  return Number(slug.split("-")[0]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = await movieApi.getById(parseId(slug));
  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;
  return <MovieDetailsPage id={parseId(slug)} />;
}
