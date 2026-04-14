import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { newsService } from "../services/newsService";

type SearchResponse = {
  articles: any[];
  totalResults: number;
};

export const useNewsSearch = (
  query: string,
  source?: string,
  fromDate?: string,
  toDate?: string,
) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedSource, setDebouncedSource] = useState("");

  // debounce query (search)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // debounce source
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSource(source ?? "");
    }, 500);

    return () => clearTimeout(timer);
  }, [source]);

  // kondisi filter aktif
  const isFiltering =
    debouncedQuery.length >= 3 ||
    debouncedSource.length >= 3 ||
    !!fromDate ||
    !!toDate;

  return useQuery<SearchResponse>({
    queryKey: ["search", debouncedQuery, debouncedSource, fromDate, toDate],

    queryFn: () =>
      newsService.searchArticles(
        debouncedQuery,
        debouncedSource,
        fromDate,
        toDate,
      ),

    enabled: isFiltering,

    staleTime: 2 * 60 * 1000,
  });
};
