import {
  Box,
  Container,
  createMuiTheme,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard/BookmarkCard";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SettingsDialogBox } from "../containers/SettingsDialogBox/SettingsDialogBox";
import {
  ViewModeEnum,
  ViewModeToggler,
} from "../containers/ViewModeToggler/ViewModeToggler";
import { BookmarkDto, bookmarksService } from "../services/bookmarks.service";
import theme from "../theme";

const PER_PAGE = 50;

type PaletteMode = "light" | "dark";

const openBookmarkInNewTab = (bookmark: any) => {
  window.open(bookmark.href, "_blank");
};

const filterByQuery = (query: string) => (bookmark: BookmarkDto) => {
  return bookmark.title.toLowerCase().includes(query.toLowerCase());
};

const Home = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkDto[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Cards);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [paletteMode, setPaletteMode] = useState<PaletteMode>("light");

  const classes = useStyles({ paletteMode });
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

  const theme = useTheme();
  const userTheme = createMuiTheme({
    ...theme,
    palette: {
      type: paletteMode,
    },
  });

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

  const toggleSettingsDialogBox = useCallback(
    () => setSettingsVisible((value) => !value),
    []
  );

  const settingsCog = useMemo(() => {
    return (
      <>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          onClick={toggleSettingsDialogBox}
        >
          <SettingsIcon />
        </IconButton>
        <SettingsDialogBox
          open={settingsVisible}
          onBackdropClick={toggleSettingsDialogBox}
          onCancelClick={toggleSettingsDialogBox}
          settings={{ darkMode: paletteMode === "dark" }}
          onChange={(settings) =>
            setPaletteMode(settings.darkMode ? "dark" : "light")
          }
        />
      </>
    );
  }, [settingsVisible, toggleSettingsDialogBox, paletteMode]);

  return (
    <>
      <Head>
        <title>xBookmarks</title>
      </Head>
      <ThemeProvider theme={userTheme}>
        <Box className={classes.root}>
          <Container>
            <Box display="flex">
              <Box flex="1">
                <SearchBar
                  onChange={setQuery}
                  query={query}
                  rightContent={settingsCog}
                />
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
      </ThemeProvider>
    </>
  );
};

export default Home;

const useStyles = makeStyles<Theme, { paletteMode: PaletteMode }>((theme) => ({
  root: {
    overflowY: "scroll",
    height: "100vh",
    background: (props) =>
      props.paletteMode === "dark"
        ? theme.palette.grey["600"]
        : theme.palette.grey[300],
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
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
