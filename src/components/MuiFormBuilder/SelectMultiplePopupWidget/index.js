import React, { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, Grid, TextField, Typography, DialogActions, Chip, Stack, Card, CardActionArea } from '@mui/material';

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

  const [selected, setSelected] = useState([]);

  const handleSelect = (event, item) => {
    const selectedIndex = selected.map((item) => item.value).indexOf(item.value);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const clearSelection = () => setSelected([]);

  const haandleSubmit = () => {
    onChange(selected.map(item => item.value));
    handleClose();
  };

  const Option = ({ label, value, disabled }) => {
    const matches = match(label, search, { insideWords: true });
    const parts = parse(label, matches);
    if (matches.length > 0 && search.length > 0) {
      return (
        <Grid key={value} item xs={6}>
          <Button
            variant={selected.find(item => item.value === value) ? 'contained' : 'outlined'}
            key={value}
            fullWidth
            disabled={disabled}
            onClick={(event) => handleSelect(event, { label, value })}
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
        </Grid>
      );
    } else if (search.length < 1) {
      return (
        <Grid key={value} item xs={6}>
          <Button
            variant={selected.find(item => item.value === value) ? 'contained' : 'outlined'}
            key={value}
            fullWidth
            disabled={disabled}
            onClick={(event) => handleSelect(event, { label, value })}
          >
            <Typography variant="subtitle1" fontSize={16} noWrap>
              {label}
            </Typography>
          </Button>
        </Grid>
      );
    }
    return;
  };

  return (
    <>
      <Card variant="outlined">
        <CardActionArea
          id={id}
          size="large"
          color="secondary"
          variant="outlined"
          onClick={handleOpen}
          autoFocus={autofocus}
          disabled={disabled || readonly}
          sx={{ minHeight: 61.5, p: 0.5 }}
        >
          <Stack direction="row" flexWrap="wrap" rowGap={0.5} columnGap={0.5}>
            {selected.length > 0
              ? selected.map((item) => <Chip size="small" key={item.value} label={item.label} />)
              : label || schema.title}
          </Stack>
        </CardActionArea>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <DialogTitle id="alert-dialog-title">
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
          <Grid container spacing={2}>
            {Array.isArray(enumOptions) &&
              enumOptions.map(({ value, label }, i) => {
                const disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
                return <Option key={i} value={value} label={label} disabled={disabled} />;
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="medium" color="secondary" fullWidth onClick={haandleSubmit}>
            انتخاب
          </Button>
          <Button variant="outlined" size="medium" color="secondary" fullWidth onClick={clearSelection}>
            پاک کردن همه
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
