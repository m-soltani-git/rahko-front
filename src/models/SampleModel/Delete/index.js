import React from 'react';
import { Stack, Avatar, Button, Tooltip, Typography, IconButton, CircularProgress } from '@mui/material';
import { DeleteOutlineRounded } from '@mui/icons-material';

import graph from './graph';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { FormattedMessage } from 'react-intl';

export default function DeletePopup({ ids, refetch, selection }) {
  const [open, setOpen] = React.useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const onOpen = () => {
    if (selection) {
      return setOpen(true);
    }
    return toast.warning(<FormattedMessage id="selectItems" />);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [handleDelete, { loading }] = useMutation(graph.delete.query, {
    context: {
      serviceName: graph.delete.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const onDelete = async () => {
    const { data, errors } = await handleDelete({
      variables: { ids },
    });
    if (!errors) {
      refetch();
      onClose();
      if (!isEmptyObject(data)) {
        data[graph.delete.name]?.messages.map((message) => toast.success(String(message)));
      }
    }
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="delete" />}>
        <IconButton sx={{ bgcolor: 'action.selected' }} size="medium" color="error" onClick={onOpen}>
          {loading ? (
            <CircularProgress color="error" size={25} />
          ) : (
            <DeleteOutlineRounded color="error" fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <NewDialog open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title={<FormattedMessage id="delete" />} onClose={onClose} />
        <NewDialogContent>
          <Stack rowGap={3} py={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'error.lighter', fontSize: 60, width: 120, height: 120 }}>
              <DeleteOutlineRounded fontSize="inherit" color="error" />
            </Avatar>
            <Typography align="center" variant="subtitle1">
              <FormattedMessage id="deleteMessage" />
            </Typography>
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button color="warning" variant="outlined" onClick={onClose}>
            <FormattedMessage id="ignore" />
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={loading}
            onClick={onDelete}
            sx={{ minWidth: 80 }}
            autoFocus
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : <FormattedMessage id="ok" />}
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
