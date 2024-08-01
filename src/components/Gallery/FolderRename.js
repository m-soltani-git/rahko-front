
import React, { useState } from 'react';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import graph from './graph';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { Avatar, Button, CircularProgress, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';

export default function FileFolderRename({ path, old_name, reload, disabled }) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [creation, { loading }] = useMutation(graph.update.query, {
    context: {
      serviceName: graph.update.serviceName,
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
      const { data } = await creation({
        variables: {
          path,
          old_name,
          new_name: name,
        },
      });
      if (!isEmptyObject(data)) {
        reload();
        onClose();
        data[graph.update.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <Tooltip title="تغییر نام">
        <IconButton disabled={disabled} color="warning" size="small" sx={{ bgcolor: 'action.hover' }} onClick={onOpen}>
          <DriveFileRenameOutlineRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <NewDialog label="تغییر نام" open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title={`تغییر نام "${old_name}"`} onClose={onClose} />
        <NewDialogContent>
          <Stack rowGap={3} py={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'warning.lighter', fontSize: 60, width: 120, height: 120 }}>
              <DriveFileRenameOutlineRoundedIcon fontSize="inherit" color="warning" />
            </Avatar>
            <Typography align="center" variant="subtitle1">
              لطفا یک نام جدید برای پوشه انتخاب کنید
            </Typography>
            <TextField
              autoFocus
              fullWidth
              id="name"
              type="text"
              margin="dense"
              label="نام جدید"
              placeholder="نام جدید"
              onChange={handleChange}
              value={name}
            />
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button color="warning" variant="contained" disabled={loading} onClick={onDone} sx={{ minWidth: 80 }} autoFocus>
            {loading ? <CircularProgress color="inherit" size={24} /> : 'بله'}
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
