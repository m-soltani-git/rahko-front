import React, { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, Grid, TextField, Typography, Stack } from '@mui/material';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import graph from './graph';
import { isEmptyObject } from 'helpers/formatObject';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const [selected, setSelected] = useState('انتخاب نشده');
  const { enumOptions, enumDisabled } = options;
  const { userToken } = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value, label) => {
    onChange(value);
    setSelected(label);
    handleClose();
  };

  
  const { data, loading } = useQuery(graph.list.query, {
    variables: {
      title: search,
      limit: 12,
    },
    context: {
      serviceName: graph.list.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });
  
  const results = !isEmpty(data) ? data[graph.list.name]?.data : [];
  // const selected = results.find((item) => item.id == val);

  const Option = ({ label, value, disabled }) => {
    const matches = match(label, search, { insideWords: true });
    const parts = parse(label, matches);
    if (matches.length > 0 && search.length > 0) {
      return (
        <Button
          fullWidth
          key={value}
          size="large"
          disabled={disabled}
          onClick={() => handleChange(value, label)}
          variant={value == val ? 'contained' : 'text'}
        >
          {parts.map((part, index) => (
            <Typography
              key={index}
              noWrap
              fontSize={16}
              variant="subtitle1"
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
          fullWidth
          key={value}
          size="large"
          disabled={disabled}
          onClick={() => handleChange(value, label)}
          variant={value == val ? 'contained' : 'text'}
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
        id={id}
        size="large"
        color="secondary"
        variant="outlined"
        sx={{ height: 61.5 }}
        autoFocus={autofocus}
        onClick={handleClickOpen}
        disabled={disabled || readonly}
      >
        {selected}
      </Button>
      <Dialog fullWidth dir="rtl" maxWidth="xs" scroll="body" open={open} onClose={handleClose}>
        <DialogTitle component="div" sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            value={search}
            variant="outlined"
            placeholder="جستجو..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogTitle>
        <DialogContent sx={{ height: 500 }}>
          <Stack rowGap={0.5}>
            {Array.isArray(results) &&
              results.map(({ id, title }, i) => {
                const disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(id) !== -1;
                return <Option key={i} value={id} label={title} disabled={disabled} />;
              })}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
