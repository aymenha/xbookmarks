import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";

const ISSUES_URL = "https://github.com/aymenha/xbookmarks/issues";

interface Settings {
  darkMode: boolean;
}

interface SettingsDialogBoxProps extends Omit<DialogProps, "onChange"> {
  settings: Settings;
  onCancelClick?: () => void;
  onChange?: (settings: Settings) => void;
}

export function SettingsDialogBox(props: SettingsDialogBoxProps) {
  const { settings, onCancelClick, onChange, ...dialogProps } = props;

  return (
    <Dialog {...dialogProps} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span>
            The settings are very basic for now, and persist only for the
            current session. This can be extended later on to cover data
            caching, data sources, and UI preferences. Feel free to pitch your
            thoughts&nbsp;
          </span>
          <Typography
            component="a"
            href={ISSUES_URL}
            target="_blank"
            color="textPrimary"
          >
            here <LaunchIcon fontSize="inherit" />
          </Typography>
          <span>&nbsp;(Github Issues).</span>
        </DialogContentText>
        <FormControlLabel
          value="top"
          label="Dark mode"
          labelPlacement="start"
          control={
            <Switch
              color="primary"
              checked={settings?.darkMode ?? true}
              onChange={(e) =>
                onChange &&
                onChange({
                  ...settings,
                  darkMode: e.target.checked,
                })
              }
            />
          }
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          size="large"
          color="primary"
          onClick={onCancelClick}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
