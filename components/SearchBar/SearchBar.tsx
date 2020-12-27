import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";

interface SearchBarProps {
  query?: string;
  onChange?: (query: string) => void;
  rightContent?: React.ReactNode;
}

export function SearchBar({
  query = "",
  rightContent,
  onChange,
}: SearchBarProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const onSearchHandler = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Paper>
      <Box className={classes.root}>
        {/* <IconButton className={classes.iconButton}>
          <MenuIcon />
        </IconButton> */}
        <InputBase
          className={classes.input}
          placeholder="Search.."
          onChange={onSearchHandler}
          value={query}
        />
        {/* <IconButton className={classes.iconButton}>
          <SearchIcon />
        </IconButton> */}
        <Divider className={classes.divider} orientation="vertical" />
        {/* <IconButton
          color="primary"
          className={classes.iconButton}
          onClick={() => setExpanded(!expanded)}
        >
          <ExpandMoreIcon />
        </IconButton> */}
        <IconButton className={classes.iconButton}>
          <SettingsIcon />
        </IconButton>
        {rightContent}
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider orientation="horizontal" />
        <CardContent>
          <Typography paragraph>filters here: not implemented</Typography>
        </CardContent>
      </Collapse>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
