import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import ThemeSwitch from "~/components/ThemeSwitch";
import Link from "~/components/Link";

import { DEFAULT_THEME } from "~/themes";

import type { AppBarProps } from "@mui/material/AppBar";
import type { ThemeNames } from "~/themes";

type HeaderProps = {
  theme: ThemeNames;
} & AppBarProps;
const Header: React.FC<HeaderProps> = ({ theme, ...props }) => {
  return (
    <AppBar
      position='sticky'
      sx={{ padding: "0.4rem 1rem", textAlign: "center" }}
      {...props}
    >
      <Typography variant='h3'>
        <Link to='/' underline='none' color='text.primary'>
          Remix
        </Link>
      </Typography>
      <ThemeSwitch theme={theme ?? DEFAULT_THEME} />
    </AppBar>
  );
};

export default Header;
