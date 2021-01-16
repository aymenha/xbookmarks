import { makeStyles } from "@material-ui/core";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useCallback } from "react";

export enum ViewModeEnum {
  List = "list",
  Cards = "cards",
  Chips = "chips",
}

interface ViewModeTogglerProps {
  viewMode: ViewModeEnum;
  onChange?: (mode: ViewModeEnum) => void;
}

export function ViewModeToggler({ viewMode, onChange }: ViewModeTogglerProps) {
  const classes = useStyles();

  const viewModeOnChangeHandler = useCallback((_, mode) => {
    onChange && onChange(mode);
  }, []);

  return (
    <ToggleButtonGroup
      exclusive
      onChange={viewModeOnChangeHandler}
      value={viewMode}
      classes={{
        root: classes.viewModeContainer,
        grouped: classes.viewModeContainerItems,
      }}
    >
      <ToggleButton value={ViewModeEnum.Cards}>
        <DashboardIcon />
      </ToggleButton>
      <ToggleButton value={ViewModeEnum.Chips}>
        <ViewColumnIcon />
      </ToggleButton>
      <ToggleButton value={ViewModeEnum.List}>
        <ViewAgendaIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const useStyles = makeStyles((theme) => ({
  viewModeContainer: {
    marginLeft: theme.spacing(1),
  },
  viewModeContainerItems: {
    border: "none",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    "&:hover": {
      borderRadius: "4px",
      // border: "1px solid red",
    },
    "&.Mui-selected": {
      borderRadius: "4px",
    },
  },
}));
