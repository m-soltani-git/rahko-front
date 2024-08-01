import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'
;
import { toast } from 'react-toastify';
import { CategoryWidget } from 'widgets';
import { Card, CardActionArea, CardHeader, Chip, IconButton, Stack, Typography } from '@mui/material';

export default function CategorySelectWidget({
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
  const [selected, setSelected] = useState(isObject ? value : { id: value, title: 'دسته بندی انتخابی' });

  const onAssign = (data, onClose) => {
    if (multiSelect) {
      setSelected(data);
      onChange(data.map((item) => item.id));
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
    if (isObject && multiSelect) {
      return setSelected([]);
    }
    return setSelected({ id: value, title: 'دسته بندی انتخابی' });
  };

  useEffect(() => {
    if (value) {
      if (isObject && multiSelect) {
        return onChange(selected.map((item) => item.id));
      }
      return onChange(String(selected?.id));
    }
  }, [selected]);

  useEffect(() => {
    if (isObject && multiSelect && value.length === 0) {
      return setSelected([]);
    }
    if (!value) {
      return setSelected({ id: value, title: 'دسته بندی انتخابی' });
    }
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
        <CategoryWidget
          isPopup
          isAssign
          disabled={disabled || readonly}
          multiSelect={multiSelect}
          title="انتخاب دسته بندی"
          onAssign={onAssign}
          assigning={false}
          initFilter={{}}
          preSelected={
            multiSelect ? selected.filter((item) => Number(item.id)) : [selected].filter((item) => Number(item.id))
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
                  {multiSelect
                    ? selected.length > 0 &&
                      selected.map((item, i) => (
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
        </CategoryWidget>
        <Stack
          p={1}
          zIndex={2}
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', right: 0, top: 0, bottom: 0 }}
        >
          <IconButton
            onClick={clearSelection}
            color="error"
            sx={{ width: 24, height: 24, fontSize: 16, bgcolor: 'error.lighter' }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
}
