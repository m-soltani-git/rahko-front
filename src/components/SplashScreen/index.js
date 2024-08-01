import React from "react";
import { Logo } from "components";
import { Stack } from "@mui/material";


const Splash = () => {
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Logo width={96} height={96} />
    </Stack>
  );
};

export default Splash;
