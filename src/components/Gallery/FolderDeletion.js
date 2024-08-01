import React, { useState } from 'react';

import graph from './graph';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { DeleteOutlineRounded } from '@mui/icons-material';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { Avatar, Button, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';

export default function FileFolderDeletion({ path, items, reload }) {
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [deletion, { loading }] = useMutation(graph.delete.query, {
    context: {
      serviceName: graph.delete.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDone = async () => {
    try {
      const { data } = await deletion({
        variables: {
          path,
          items: items.map((item) => ({ key: item.key, name: item.name })),
        },
      });
      if (!isEmptyObject(data)) {
        reload();
        onClose();
        data[graph.delete.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <Tooltip title="حذف کردن">
        <IconButton
          color="error"
          size="small"
          sx={{ bgcolor: 'action.hover' }}
          onClick={onOpen}
          disabled={items.length === 0}
        >
          <DeleteOutlineRounded fontSize="small" />
        </IconButton>
      </Tooltip>
      <NewDialog open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title="حذف کردن" onClose={onClose} />

        <NewDialogContent>
          <Stack rowGap={3} py={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'error.lighter', fontSize: 60, width: 120, height: 120 }}>
              <DeleteOutlineRounded fontSize="inherit" color="error" />
            </Avatar>
            <Typography align="center" variant="subtitle1">
              آیا از حدف این مورد اطمینان دارید؟
            </Typography>
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button color="warning" variant="outlined" onClick={onClose}>
            فعلا نه
          </Button>
          <Button color="error" variant="contained" disabled={loading} onClick={onDone} sx={{ minWidth: 80 }} autoFocus>
            {loading ? <CircularProgress color="inherit" size={24} /> : 'بله'}
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
