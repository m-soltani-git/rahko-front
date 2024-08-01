import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { BoothsWidget } from 'widgets';
import { Card, CardActionArea, CardHeader, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material';

export default function BrandSelectWidget({
  id,
  label,
  value,
  schema,
  options,
  required,
  readonly,
  disabled,
  onChange,
  uiSchema,
  autofocus,
  hideError,
  rawErrors = [],
}) {
  const isObject = typeof value === 'object';
  const [multiSelect, setMultiple] = useState(schema.type === 'array');
  const [selected, setSelected] = useState(value || (multiSelect ? [] : {}));
  const [loading, setLoading] = useState(true);

  const onAssign = (data, onClose) => {
    if (multiSelect) {
      setSelected(data);
      onChange(data.map((item) => item?.id));
      onClose();
    } else {
      if (data.length > 1) {
        return toast.warning('لطفا تنها یک مورد انتخاب کنید');
      }
      if (data.length === 0) {
        return toast.warning('لطفا یک مورد انتخاب کنید');
      }
      const { id, title } = data[0];
      setSelected({ id, title });
      onChange(String(id));
      onClose();
    }
  };

  const handleSelect = (data) => {
    const newSelected = selected.filter((item) => item.id !== data.id);
    setSelected(newSelected);
    return onChange(newSelected.map((item) => item.id));
  };

  const clearSelection = () => {
    onChange(undefined);
    if (isObject && multiSelect) {
      return setSelected([]);
    }
    return setSelected({});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value && loading) {
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            const newVals = value.filter((val) => val);
            setSelected(newVals);
            onChange(newVals.map((item) => item.id));
          } else {
            setSelected(value);
            onChange(value?.id);
          }
        }
      }
      return setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: 61.75,
          bgcolor: 'transparent',
          ':hover': {
            borderColor: 'text.primary',
          },
        }}
      >
        <BoothsWidget
          isPopup
          isAssign
          disabled={disabled || readonly}
          multiSelect={multiSelect}
          title="انتخاب غرفه"
          onAssign={onAssign}
          assigning={false}
          initFilter={{}}
          preSelected={
            multiSelect && Array.isArray(selected)
              ? selected.filter((item) => item?.id !== undefined)
              : [selected].filter((item) => item?.id !== undefined)
          }
        >
          <CardActionArea disabled={disabled || readonly} sx={{ height: '100%' }}>
            <CardHeader
              sx={{ py: 0.5, px: 1 }}
              title={
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontSize={selected?.id || selected?.length > 0 ? 12 : 20}
                >
                  {label || schema.title}
                </Typography>
              }
              subheader={
                <Stack direction="row" flexWrap="wrap" rowGap={0.5} columnGap={0.5}>
                  {multiSelect && Array.isArray(selected)
                    ? selected.map((item, i) => (
                        <Chip
                          key={i}
                          size="small"
                          label={item?.title}
                          disabled={disabled || readonly}
                          onDelete={() => handleSelect(item)}
                        />
                      ))
                    : selected?.id && <Chip size="small" label={selected?.title} disabled={disabled || readonly} />}
                </Stack>
              }
            />
          </CardActionArea>
        </BoothsWidget>
        <Stack
          p={1}
          zIndex={2}
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', right: 0, top: 0, bottom: 0 }}
        >
          {loading ? (
            <CircularProgress color="secondary" size={22} />
          ) : (
            <IconButton
              onClick={clearSelection}
              color="error"
              disabled={loading}
              sx={{ width: 24, height: 24, fontSize: 16, bgcolor: 'error.lighter' }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </Stack>
      </Card>
    </>
  );
}
