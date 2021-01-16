import { Box, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard/BookmarkCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {
  ViewModeEnum,
  ViewModeToggler,
} from "../containers/ViewModeToggler/ViewModeToggler";
import { BookmarkDto, bookmarksService } from "../services/bookmarks.service";
import theme from "../theme";

const useStyles = makeStyles(() => ({
  root: {
    overflowY: "scroll",
    height: "100vh",
    background: theme.palette.grey[300],
    padding: theme.spacing(3),
  },
  listContainer: {
    "&>.BookmarkCard-root": {
      margin: theme.spacing(0.5),
    },
  },
  viewModeList: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignItems: "stretch",
  },
  viewModeCards: {
    columns: "4",
    "& .BookmarkCard-root": {
      width: "100%",
      display: "inline-block",
    },
  },
  viewModeChips: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    "& .BookmarkCard-root": {
      maxWidth: "30em",
      whiteSpace: "nowrap",
    },
    "& .BookmarkCard-title": {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
}));

const openBookmarkInNewTab = (bookmark: any) => {
  window.open(bookmark.href, "_blank");
};

const Home = () => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState<BookmarkDto[]>([]);
  const [visibleBookmarks, setVisibleBookmarks] = useState<BookmarkDto[]>([]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Cards);

  const listContainerClasses = clsx({
    [classes.listContainer]: true,
    [classes.viewModeCards]: viewMode === ViewModeEnum.Cards,
    [classes.viewModeChips]: viewMode === ViewModeEnum.Chips,
    [classes.viewModeList]: viewMode === ViewModeEnum.List,
  });

  useEffect(() => {
    bookmarksService.getBookmarks().then(setBookmarks);
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

  const bookmarkElms = useMemo(() => {
    const elms = visibleBookmarks
      .slice(0, 50)
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
