import { Form } from "remix";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import type { ThemeNames } from "~/themes";

type ThemeSwitchProps = {
  theme: ThemeNames;
};
const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ theme }) => {
  return (
    <Box component='div'>
      <Form reloadDocument action='/' method='post'>
        <Tooltip title='Toggle theme'>
          <IconButton type='submit' aria-label='Toggle theme'>
            {theme === "light" ? <Brightness7Icon /> : <Brightness2Icon />}
          </IconButton>
        </Tooltip>
      </Form>
    </Box>
  );
};

export default ThemeSwitch;
