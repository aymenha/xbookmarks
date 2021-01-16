import { httpService } from "./http.service";

export interface BookmarkDto {
  title: string;
  href: string;
  icon: string;
  created_at: string;
}

interface Entrypoint {
  categories: {
    title: string;
    filename: string;
  }[];
}

interface BookmarksService {
  getBookmarks: () => Promise<BookmarkDto[]>;
}

async function getBookmarks(): Promise<BookmarkDto[]> {
  const entrypoint = await httpService.get<Entrypoint>("/data/index.json");

  const categories = entrypoint.data.categories;
  const categoriesPromises = categories.map((cat) =>
    httpService.get<BookmarkDto[]>(`/data/${cat.filename}`)
  );

  const bookmarks = await Promise.allSettled(categoriesPromises);
  return bookmarks.reduce((value, bookmarPromiseSettle) => {
    if (bookmarPromiseSettle.status === "fulfilled")
      return [...value, ...bookmarPromiseSettle.value.data];
    else return value;
  }, [] as BookmarkDto[]);
}

export const bookmarksService: BookmarksService = {
  getBookmarks,
};
