import React, { useState } from 'react';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';

import graph from './graph';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { Avatar, Button, CircularProgress, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';

export default function FileFolderCreation({ path, reload }) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [mutate, { loading }] = useMutation(graph.create.query, {
    context: {
      serviceName: graph.create.serviceName,
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

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onDone = async () => {
    try {
      const { data } = await mutate({
        variables: {
          path,
          name,
        },
      });
      if (!isEmptyObject(data)) {
        reload();
        onClose();
        data[graph.create.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <Tooltip title="ایجاد پوشه جدید">
        <IconButton color="info" size="small" sx={{ bgcolor: 'action.hover' }} onClick={onOpen}>
          <CreateNewFolderRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <NewDialog label="ایجاد پوشه جدید" open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title="ایجاد پوشه جدید" onClose={onClose} />
        <NewDialogContent>
          <Stack rowGap={3} py={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'info.lighter', fontSize: 60, width: 120, height: 120 }}>
              <CreateNewFolderRoundedIcon fontSize="inherit" color="info" />
            </Avatar>
            <Typography align="center" variant="subtitle1">
              لطفا یک نام برای پوشه انتخاب کنید
            </Typography>
            <TextField
              autoFocus
              fullWidth
              id="name"
              type="text"
              margin="dense"
              label="نام پوشه"
              placeholder="پوشه جدید"
              onChange={handleChange}
              value={name}
            />
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button color="info" variant="contained" disabled={loading} onClick={onDone} sx={{ minWidth: 80 }} autoFocus>
            {loading ? <CircularProgress color="inherit" size={24} /> : 'بله'}
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
