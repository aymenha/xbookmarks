import { Box, Card, makeStyles } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";

export interface Bookmark {
  title: string;
  icon: string;
  href: string;
}

interface BookmarkCardProps {
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
    <Card className={classes.root} onClick={onClickHandler}>
      <Box className={classes.titleContainer}>
        <img src={icon} alt="" className={classes.icon} />
        <span className={classes.title}>{titleElm}</span>
      </Box>
      {/* <span className={classes.href}>{origin}</span> */}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid transparent",
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #b5b6b6",
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {},
  href: {
    marginLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  icon: {
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));
