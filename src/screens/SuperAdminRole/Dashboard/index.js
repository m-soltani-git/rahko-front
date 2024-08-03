import React from "react";
import { Page } from "components";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Form from './Form'

export default function SuperAdminRoleDashboard() {
  return (
    <Page title="Dashboard">
      <Typography>
        <FormattedMessage id="welcome" />
      </Typography>
      <Form />
    </Page>
  );
}
