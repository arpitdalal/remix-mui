import AppBar from "@mui/material/AppBar";
import type { AppBarProps } from "@mui/material/AppBar";

const Footer: React.FC<AppBarProps> = (props) => {
  return (
    <AppBar
      position='fixed'
      sx={{ top: "auto", bottom: 0, padding: "0.4rem 1rem" }}
      {...props}
      component='footer'
    >
      © Remix {new Date().getFullYear()}
    </AppBar>
  );
};

export default Footer;
