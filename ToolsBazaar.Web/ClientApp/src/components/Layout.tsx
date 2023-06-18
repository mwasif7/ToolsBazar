import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { NavMenu } from "./NavMenu";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <NavMenu />
      <Box component="main" m={4}>
        {children}
      </Box>
    </Box>
  );
}
