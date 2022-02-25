import type { AppBarProps } from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';

const Footer: React.FC<AppBarProps> = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        padding: "0.4rem 1rem",
        textAlign: "center",
      }}
      {...props}
      component="footer"
    >
      Made with{" "}
      <Link href="https://mui.com/" color="text.primary">
        MUI
      </Link>
    </AppBar>
  );
};

export default Footer;
