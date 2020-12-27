import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard/BookmarkCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {
  ViewModeEnum,
  ViewModeToggler,
} from "../containers/ViewModeToggler/ViewModeToggler";
import theme from "../theme";

interface Bookmark {
  title: string;
  href: string;
  icon: string;
  created_at: string;
}

const useStyles = makeStyles(() => ({
  root: {
    overflowY: "scroll",
    height: "100vh",
    background: theme.palette.grey[300],
    padding: theme.spacing(3),
  },
  listContainer: {
    "&>*": {
      margin: theme.spacing(0.5),
    },
  },
  viewModeCards: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignItems: "stretch",
  },
  viewModeChips: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

async function fetchBookmarks(): Promise<Bookmark[]> {
  const res = await axios("/data/data.json");
  return res.data;
}

const Home = () => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Chips);
  const [visibleBookmarks, setVisibleBookmarks] = useState<Bookmark[]>([]);

  const listContainerClasses = clsx({
    [classes.listContainer]: true,
    [classes.viewModeCards]: viewMode === ViewModeEnum.Cards,
    [classes.viewModeChips]: viewMode === ViewModeEnum.Chips,
  });

  useEffect(() => {
    fetchBookmarks().then(setBookmarks);
  }, []);

  useEffect(() => {
    setVisibleBookmarks(bookmarks);
  }, [bookmarks]);

  const filterByQuery = useCallback(
    (q: string) => {
      setQuery(q);
      setVisibleBookmarks(bookmarks.filter((b) => b.title.includes(q)));
    },
    [bookmarks]
  );

  const openBookmarkInNewTab = useCallback((bookmark: any) => {
    window.open(bookmark.href, "_blank");
  }, []);

  const bookmarkElms = useMemo(() => {
    const elms = visibleBookmarks
      .slice(0, 20)
      .map((b, index) => (
        <BookmarkCard
          bookmark={b}
          highlight={query}
          onClick={openBookmarkInNewTab}
          key={index}
        />
      ));
    return elms;
  }, [visibleBookmarks, query]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box display="flex">
          <Box flex="1">
            <SearchBar onChange={filterByQuery} query={query} />
          </Box>
          <ViewModeToggler viewMode={viewMode} onChange={setViewMode} />
        </Box>
        <Box pt={3} className={listContainerClasses}>
          {bookmarkElms}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
