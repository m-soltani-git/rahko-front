import React, { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, Grid, TextField, Typography, Stack } from '@mui/material';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function SelectPopup({
  id,
  label,
  schema,
  options,
  required,
  readonly,
  disabled,
  value: val,
  autofocus,
  onChange,
  uiSchema,
  hideError,
  rawErrors = [],
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { enumOptions, enumDisabled } = options;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    onChange(value);
    handleClose();
  };

  const selected = enumOptions.find((item) => item.value == val);

  const Option = ({ label, value, disabled }) => {
    const matches = match(label, search, { insideWords: true });
    const parts = parse(label, matches);
    if (matches.length > 0 && search.length > 0) {
      return (
        <Button
          variant={value == val ? 'contained' : 'text'}
          key={value}
          fullWidth
          disabled={disabled}
          onClick={() => handleChange(value)}
          size='large'
        >
          {parts.map((part, index) => (
            <Typography
              key={index}
              variant="subtitle1"
              fontSize={16}
              noWrap
              sx={{
                fontWeight: part.highlight ? 700 : 400,
              }}
            >
              {part.text}
            </Typography>
          ))}
        </Button>
      );
    } else if (search.length < 1) {
      return (
        <Button
          variant={value == val ? 'contained' : 'text'}
          key={value}
          fullWidth
          size="large"
          disabled={disabled}
          onClick={() => handleChange(value)}
        >
          <Typography variant="subtitle1" fontSize={16} noWrap>
            {label}
          </Typography>
        </Button>
      );
    }
    return;
  };

  return (
    <>
      <Button
        autoFocus={autofocus}
        id={id}
        sx={{ height: 61.5 }}
        variant="outlined"
        size="large"
        color="secondary"
        onClick={handleClickOpen}
        disabled={disabled || readonly}
      >
        {selected?.label || label || schema.title}
      </Button>
      <Dialog fullWidth dir="rtl" maxWidth="xs" scroll="body" open={open} onClose={handleClose}>
        <DialogTitle component="div" sx={{ p: 2 }}>
          <TextField
            value={search}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            variant="outlined"
            placeholder="جستجو..."
          />
        </DialogTitle>
        <DialogContent sx={{ height: 500 }}>
          <Stack rowGap={0.5}>
            {Array.isArray(enumOptions) &&
              enumOptions.map(({ value, label }, i) => {
                const disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
                return <Option key={i} value={value} label={label} disabled={disabled} />;
              })}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
