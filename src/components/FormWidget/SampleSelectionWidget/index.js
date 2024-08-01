import graph from './graph';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { toast } from 'react-toastify';
import { SampleModel } from 'models';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { isEmptyObject } from 'helpers/formatObject';
import { ariaDescribedByIds, enumOptionsIndexForValue, enumOptionsValueForIndex, labelValue } from '@rjsf/utils';
import { Card, CardActionArea, CardHeader, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material';

export default function CustomSelectWidget({
  schema,
  id,
  name, // remove this from textFieldProps
  options,
  label,
  hideLabel,
  required,
  disabled,
  placeholder,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  errorSchema,
  rawErrors = [],
  registry,
  uiSchema,
  hideError,
  formContext,
  ...textFieldProps
}) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;
  const isObject = typeof value === 'object';
  const multiSelect = schema.type === 'array';
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(value);
  const { userToken } = useSelector((state) => state.auth);

  const {
    language: { direction },
  } = useSelector((state) => state.setting);

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

  const [getModel, { loading: fetching }] = useLazyQuery(graph.get.query, {
    context: {
      serviceName: graph.get.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleData = async () => {
    try {
      const { data } = await getModel({
        variables: {
          ids: value,
        },
      });
      if (!isEmptyObject(data)) {
        const res = data[graph.get.name].data;
        const modified = multiSelect ? res.map(({ id, title }) => ({ id, title })) : res[0];
        setSelected(modified);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (loading && value) {
        return handleData();
      }
      return setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
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
          direction,
        }}
      >
        <SampleModel
          isPopup
          isAssign
          disabled={disabled || readonly}
          multiSelect={multiSelect}
          title={labelValue(label || undefined, hideLabel, undefined)}
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
              dir={direction}
              sx={{ py: 0.5, px: 1.5 }}
              title={
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontSize={selected?.id || selected?.length > 0 ? 12 : 20}
                >
                  <FormattedMessage id={label || schema.title} />
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
        </SampleModel>
        <Stack
          p={1}
          zIndex={2}
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', right: 0, top: 0, bottom: 0 }}
        >
          {loading || fetching ? (
            <CircularProgress color="primary" size={22} />
          ) : (
            <IconButton
              color="error"
              disabled={loading}
              onClick={clearSelection}
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
