import { Box, Card, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";

export interface Bookmark {
  title: string;
  icon: string;
  href: string;
  createdAt: number;
}

export interface BookmarkCardProps {
  bookmark: Bookmark;
  highlight?: string;
  onClick?: (bookmark: Bookmark) => void;
}

export function BookmarkCard({
  bookmark,
  highlight,
  onClick,
}: BookmarkCardProps) {
  const { title, href, icon } = bookmark;
  const classes = useStyles();
  const origin = useMemo(() => {
    try {
      return new URL(href)?.origin;
    } catch (error) {
      return "";
    }
  }, [href]);

  const titleElm = useMemo(() => {
    if (!highlight) return title;
    const highlightRule = new RegExp(`(${highlight})`, "i");
    const titleParts = title.split(highlightRule);
    return titleParts.map((value, index) => {
      if (highlightRule.test(value)) return <mark key={index}>{value}</mark>;
      return <span key={index}>{value}</span>;
    });
  }, [highlight, title]);

  const onClickHandler = useCallback(() => {
    onClick && onClick(bookmark);
  }, [onClick, bookmark]);

  return (
    <Card
      className={clsx("BookmarkCard-root", classes.root)}
      onClick={onClickHandler}
    >
      <Box className={classes.container}>
        <img src={icon} alt="" className={classes.icon} />
        <span className={clsx("BookmarkCard-title", classes.title)}>
          {titleElm}
        </span>
      </Box>
      {/* <span className={classes.href}>{origin}</span> */}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.grey["500"],
    // color: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    border: "1px solid transparent",
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #b5b6b6",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    wordBreak: "break-word",
  },
  href: {
    marginLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  icon: {
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));
