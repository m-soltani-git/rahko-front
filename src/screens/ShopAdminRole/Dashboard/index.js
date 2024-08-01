import React from "react";
import { Page } from "components";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function ShopAdminRoleDashboard() {
  return (
    <Page title="Dashboard">
      <Typography>
        <FormattedMessage id="welcome" />
      </Typography>
    </Page>
  );
}
