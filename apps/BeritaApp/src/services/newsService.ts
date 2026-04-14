import api from "./api";

export type Category =
  | "general"
  | "technology"
  | "sports"
  | "business"
  | "health";

export const newsService = {
  // Top headlines
  getTopHeadlines: async (category: Category = "general", page = 1) => {
    const { data } = await api.get("/top-headlines", {
      params: {
        country: "us",
        category,
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles,
      totalResults: data.totalResults,
    };
  },

  // SEARCH + FILTER (VERSI FINAL)
  searchArticles: async (
    query: string,
    source?: string,
    from?: string,
    to?: string,
    page = 1,
  ) => {
    const { data } = await api.get("/everything", {
      params: {
        q: query || "news",
        sources: source || undefined,
        from: from || undefined,
        to: to || undefined,
        sortBy: "publishedAt",
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles,
      totalResults: data.totalResults,
    };
  },

  // Sources
  getSources: async (category?: Category) => {
    const { data } = await api.get("/top-headlines/sources", {
      params: { country: "id", category },
    });

    return data.sources;
  },
};
