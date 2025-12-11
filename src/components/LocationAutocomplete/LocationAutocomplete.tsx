import { useEffect, useState } from "react";
import { fetchLocationResults } from "../../utils/fetchLocationResults";
import type { LocationResult } from "../../types/types";
import styles from "./LocationAutocomplete.module.css";

interface Props {
  value: string;
  onSelect: (location: string) => void;
}

export function LocationAutocomplete({ value, onSelect }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetchLocationResults(query, controller.signal).then(
      (results: LocationResult[]) => {
        setResults(results);
        setOpen(results.length > 0);
      }
    );

    return () => controller.abort();
  }, [query]);

  function handleSelect(r: LocationResult) {
    const fullName = `${r.name}${r.admin1 ? `, ${r.admin1}` : ""}, ${
      r.country
    }`;

    setQuery(fullName);
    onSelect(fullName);
    setOpen(false);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Search for a city"
      />

      {open && results.length > 0 && (
        <ul className={styles.list}>
          {results.map((r) => (
            <li
              key={r.id}
              className={styles.item}
              onClick={() => handleSelect(r)}
            >
              {r.name}
              {r.admin1 ? `, ${r.admin1}` : ""} {r.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
