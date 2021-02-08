import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

export default createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: red["A200"],
      // main: amber["A200"],
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 8px 20px rgba(0,0,0,0.06)",
      },
    },
    MuiButton: {
      root: {
        boxShadow: "0px 8px 20px rgba(0,0,0,0.06) !important",
        // background: amber["A200"],
      },
    },
  },
});
