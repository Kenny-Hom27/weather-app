import type { LocationResult } from "../types/types";

export async function fetchLocationResults(
  query: string,
  signal: AbortSignal
): Promise<LocationResult[]> {
  if (query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error("Failed to fetch location data");

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return [];
    console.error("Location fetch error:", err);
    return [];
  }
}
