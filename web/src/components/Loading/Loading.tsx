import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export function Loading() {
  return (
    <Stack spacing={2} direction="row">
      <CircularProgress color="secondary" />
      {/*       <CircularProgress color="success" />
      <CircularProgress color="inherit" /> */}
    </Stack>
  );
}
