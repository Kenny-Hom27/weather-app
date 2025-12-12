import type { LocationResult } from "../types/types";

/**
 * Fetches location search results from the Open-Meteo geocoding API.
 *
 * Performs an asynchronous search for locations matching the query string.
 * Returns an empty array if the query is too short (< 2 characters) or if the request
 * is aborted. Handles network errors gracefully by returning an empty array.
 *
 * @param query - Search query string (minimum 2 characters required)
 * @param signal - AbortSignal to allow cancellation of the fetch request
 * @returns Promise resolving to an array of LocationResult objects, or empty array on error/abort
 *
 * @example
 * ```ts
 * const controller = new AbortController();
 * const results = await fetchLocationResults("Boston", controller.signal);
 * // Returns: [{ id: 1, name: "Boston", admin1: "MA", country: "USA", ... }]
 * ```
 */
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
