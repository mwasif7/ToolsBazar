import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function OrderSuccessPage() {
  return (
    <Stack spacing={4} alignItems="center">
      <CheckCircleOutlineIcon sx={{ fontSize: 120 }} color="success" />
      <Typography variant="h2" textAlign="center" color="primary.dark">
        Your order has been created!
      </Typography>
      <Typography variant="h4" textAlign="center">
        You will be receiving a confirmation e-mail with order details.
      </Typography>
      <Typography textAlign="center">
        Take me back to{" "}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </Stack>
  );
}
