import api from "./api";

export type Category =
  | "general"
  | "technology"
  | "sports"
  | "business"
  | "health";

export const newsService = {
  // GET top headlines berdasarkan kategori
  getTopHeadlines: async (category: Category = "general", page = 1) => {
    const { data } = await api.get("/top-headlines", {
      params: { country: "us", category, page, pageSize: 10 },
    });
    return { articles: data.articles, totalResults: data.totalResults };
  },

  // GET search berita
  searchArticles: async (query: string, page = 1) => {
    const { data } = await api.get("/everything", {
      params: {
        q: query,
        language: "id",
        sortBy: "publishedAt",
        page,
        pageSize: 10,
      },
    });
    return { articles: data.articles, totalResults: data.totalResults };
  },

  // GET sources
  getSources: async (category?: Category) => {
    const { data } = await api.get("/top-headlines/sources", {
      params: { country: "id", category },
    });
    return data.sources;
  },
};
