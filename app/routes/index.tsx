import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export default function Index() {
  return (
    <Box sx={{ pt: "20vh", textAlign: "center" }}>
      <TextField type='email' name='email' label='Email' />
      <Box component='div' sx={{ mt: 2 }}>
        <LoadingButton type='submit' variant='outlined'>
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
}
