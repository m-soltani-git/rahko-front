import { Box } from "@mui/material";
import { TourProvider } from "providers";
import { Outlet } from 'react-router-dom';
import { useState, Suspense } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TourProvider>
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <Box
          sx={{
            px: 1,
            pt: 10,
            pl: {
              xs: 0,
              lg: 41,
            },
            flexGrow: 1,
            minHeight: "calc(100vh)",
            bgcolor: "transparent",
          }}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </Box>
      </TourProvider>
    </>
  );
}
