import React, { type ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
    </>
  );
};

export default React.memo(Layout);
