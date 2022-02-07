import { createTheme } from "@mui/material/styles";

import typography from "~/themes/typography";
import colors from "~/themes/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.pink,
      contrastText: colors.darkBlue,
    },
    background: {
      default: colors.white,
      paper: colors.white,
    },
    text: {
      primary: colors.darkBlue,
      secondary: colors.lightBlue,
    },
  },
  typography,
});

export default theme;
