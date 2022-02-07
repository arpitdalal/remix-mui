import { createTheme } from "@mui/material/styles";

import typography from "~/themes/typography";
import colors from "~/themes/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.pink,
      contrastText: colors.darkBlue,
    },
    background: {
      default: colors.darkBlue,
      paper: colors.darkBlue,
    },
    text: {
      primary: colors.white,
      secondary: colors.lightBlue,
    },
  },
  typography,
});

export default theme;
