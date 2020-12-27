import axios from "axios";

export interface BookmarkDto {
  title: string;
  href: string;
  icon: string;
  created_at: string;
}

interface BookmarksService {
  getBookmarks: () => Promise<BookmarkDto[]>;
}

async function getBookmarks(): Promise<BookmarkDto[]> {
  const res = await axios("/data/data.json");
  return res.data;
}

export const bookmarksService: BookmarksService = {
  getBookmarks,
};
