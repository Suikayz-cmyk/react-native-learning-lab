import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { newsService } from "../services/newsService";

export const useNewsSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => newsService.searchArticles(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 2 * 60 * 1000,
  });
};
