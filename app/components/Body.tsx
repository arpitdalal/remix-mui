import Box from "@mui/system/Box";
import type { BoxProps } from "@mui/system/Box";

const Body: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box component='main' sx={{ px: "2rem", pb: "40px" }} {...props}>
      {children}
    </Box>
  );
};

export default Body;
