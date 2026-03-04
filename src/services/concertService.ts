import type { ConcertStatus } from '../types';
import type { Concert } from "../types";

// API pública para la clase (Sin Backend)
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// "catalogo" convertir posts en conciertos
const GENRES = ["Indie", "Salsa", "Acoustic", "Electronic", "Rock"];
const CITIES = ["Barranquilla", "Cartagena", "Bogotá", "Cali", "Medellín"];
const VENUES = ["Parque Central", "Club Aurora", "Arena Norte", "Plaza Sonora", "Teatro Luna"];

function fakeDateFromId(id: number) {
  const day = ((id % 28) + 1);
  return `${day}/03/2026`;
}

function mapPostToConcert(post: { id: number, title: string, body: string, userId: number }): Concert {
  const genre = GENRES[post.id % GENRES.length];
  const city = CITIES[post.id % CITIES.length];
  const venue = VENUES[post.id % VENUES.length];

  const price = 200000 + (post.id % 8) * 2
  const status: ConcertStatus = post.id % 5 === 0 ? "SOLD_OUT" : "AVAILABLE";
  return {
    id: post.id,
    title: post.title,
    date: fakeDateFromId(post.id),
    venue,
    genre,
    city,
    status,
    price
  };
}

export async function getConcerts(): Promise<Concert[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) { throw new Error('Failed to fetch concerts') }
  const post = (await res.json()) as Array<{ id: number, title: string, body: string, userId: number }>;

  return post.slice(0, 20).map(mapPostToConcert);
}

export async function getConcertById(id: number): Promise<Concert> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) { throw new Error('Failed to fetch concerts') }
  const post = (await res.json()) as { id: number, title: string, body: string; userId: number };
  return mapPostToConcert(post);
}