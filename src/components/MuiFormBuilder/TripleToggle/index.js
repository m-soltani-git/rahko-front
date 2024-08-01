import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { schemaRequiresTrueValue } from "@rjsf/utils";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import { Typography } from "@mui/material";

const CheckboxWidget = (props) => {
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
    onBlur,
    onFocus,
  } = props;
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  const required = schemaRequiresTrueValue(schema);

  const _onChange = (event, checked) => {
    checked !== null && onChange(checked);
  };
  const _onBlur = (event, checked) => {
    onBlur(id, checked);
  };
  const _onFocus = (event, checked) => {
    onFocus(id, checked);
  };

  return (
    <FormControlLabel
      sx={{
        mr: 0,
        ml: 0,
        height: 62,
        px: 1,
        justifyContent: 'space-between',
        border: `1px solid #eee`,
        borderRadius: 2,
      }}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      labelPlacement="start"
      label={
        <Typography color="text.secondary" variant="subtitle1">
          {label}
        </Typography>
      }
      control={
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          aria-label={label || ''}
          size="small"
        >
          <ToggleButton size="small" color="success" value={1} aria-label="left aligned">
            <CheckCircleOutlineRoundedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton size="small" color="standard" value={2} aria-label="right aligned">
            <AdjustRoundedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton size="small" color="error" value={0} aria-label="centered">
            <HighlightOffRoundedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      }
    />
  );
};

export default CheckboxWidget;
