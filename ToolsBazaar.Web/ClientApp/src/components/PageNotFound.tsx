import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export function PageNotFound() {
  return (
    <Box>
      <Typography variant="h1" textAlign="center">
        404
      </Typography>
      <Typography variant="h3" textAlign="center">
        Oops...Page Not Found
      </Typography>
      <Typography textAlign="center">
        Please try the link again, or{" "}
        <Link component={RouterLink} to="/">
          go to our home page
        </Link>
        .
      </Typography>
    </Box>
  );
}
