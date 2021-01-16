import { Box, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard/BookmarkCard";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {
  ViewModeEnum,
  ViewModeToggler,
} from "../containers/ViewModeToggler/ViewModeToggler";
import { BookmarkDto, bookmarksService } from "../services/bookmarks.service";
import theme from "../theme";

const PER_PAGE = 50;

const openBookmarkInNewTab = (bookmark: any) => {
  window.open(bookmark.href, "_blank");
};

const filterByQuery = (query: string) => (bookmark: BookmarkDto) => {
  return bookmark.title.includes(query);
};

const Home = () => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState<BookmarkDto[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Cards);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    setQuery("");
    setCurrentPage(0);
    setVisibleCount(bookmarks.length);
  }, [bookmarks]);

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  const bookmarkElms = useMemo(() => {
    const offsetStart = currentPage * PER_PAGE;
    const offsetEnd = currentPage * PER_PAGE + PER_PAGE;
    const filteredBookmarks = query
      ? bookmarks.filter(filterByQuery(query))
      : bookmarks;

    setVisibleCount(filteredBookmarks.length);

    return filteredBookmarks
      .slice(offsetStart, offsetEnd)
      .map((b, index) => (
        <BookmarkCard
          bookmark={b}
          highlight={query}
          onClick={openBookmarkInNewTab}
          key={index}
        />
      ));
  }, [bookmarks, query, currentPage]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box display="flex">
          <Box flex="1">
            <SearchBar onChange={setQuery} query={query} />
          </Box>
          <ViewModeToggler viewMode={viewMode} onChange={setViewMode} />
        </Box>
        <Box my={2} display="flex" justifyContent="flex-end">
          <Pagination
            currentPage={currentPage}
            perPage={PER_PAGE}
            count={visibleCount}
            onChange={setCurrentPage}
          />
        </Box>
        <Box className={listContainerClasses}>{bookmarkElms}</Box>
      </Container>
    </Box>
  );
};

export default Home;

const useStyles = makeStyles(() => ({
  root: {
    overflowY: "scroll",
    height: "100vh",
    background: theme.palette.grey[300],
    padding: theme.spacing(3),
  },
  listContainer: {
    margin: theme.spacing(-0.5),
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
    "& .BookmarkCard-root": {
      width: "100%",
      display: "inline-block",
    },
    [theme.breakpoints.up("sm")]: {
      columns: "2",
    },
    [theme.breakpoints.up("md")]: {
      columns: "3",
    },
    [theme.breakpoints.up("lg")]: {
      columns: "5",
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
