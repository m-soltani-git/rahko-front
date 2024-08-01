import React, { useState } from 'react';
import {
  alpha,
  Card,
  Stack,
  Tooltip,
  Collapse,
  Checkbox,
  useTheme,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import Form from './Form';
import { ExpandMoreButton } from 'components';
import { FormattedMessage } from 'react-intl';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { FilterAltOffRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function Filter({
  init,
  total,
  loading,
  refetch,
  isPopup,
  selection,
  acception,
  setFilter,
  clearFilter,
  clearSelection,
  handleSelectAllClick,
}) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const {
    language: { direction },
  } = useSelector((state) => state.setting);

  const handleExpandClick = () => setExpanded(!expanded);

  const filterCount = digitsEnToFa(
    Object.values(init)
      .map((val) => {
        if (typeof val === 'object') {
          return Boolean(val.length);
        } else {
          return Boolean(val);
        }
      })
      .filter((val) => val).length
  );

  return (
    <>
      <Card
        elevation={1}
        sx={{
          direction,
          bgcolor: selection ? alpha(theme.palette.warning.light, 1) : alpha(theme.palette.background.paper, 1),
        }}
      >
        <CardHeader
          title={
            <Typography variant="subtitle1" fontSize={16}>
              <FormattedMessage
                id={selection > 0 ? 'selected' : 'selectAll'}
                values={{ selected: digitsEnToFa(selection) }}
              />
            </Typography>
          }
          sx={{ p: 1 }}
          subheader={
            <Typography fontSize={12} variant="subtitle2">
              <FormattedMessage id="filtered" values={{ filtered: filterCount }} />
            </Typography>
          }
          avatar={
            <Checkbox
              size="small"
              color="warning"
              indeterminate={selection > 0 && selection < acception}
              checked={acception > 0 && selection === acception}
              onChange={handleSelectAllClick}
            />
          }
          action={
            <Stack columnGap={0.5} direction="row" alignItems="center" justifyContent="flex-end">
              <Tooltip title={<FormattedMessage id="rmFilters" />}>
                <IconButton sx={{ bgcolor: 'info.lighter' }} size="small" color="info" onClick={clearFilter}>
                  <FilterAltOffRounded color="info" fontSize="small" />
                </IconButton>
              </Tooltip>
              <ExpandMoreButton
                open={<FormattedMessage id="showFilters" />}
                close={<FormattedMessage id="hideFilters" />}
                onClick={handleExpandClick}
                expand={expanded}
              >
                <KeyboardArrowUpRounded color="warning" fontSize="small" />
              </ExpandMoreButton>
            </Stack>
          }
        />
        <Collapse in={expanded} timeout="auto">
          <CardContent sx={{ py: 0, px: 1 }}>
            <Form init={init} setFilter={setFilter} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
