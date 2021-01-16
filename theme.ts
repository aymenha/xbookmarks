import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

export default createMuiTheme({
  palette: {
    primary: {
      main: indigo["A200"],
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
      },
    },
  },
});
