import graph from './graph';
import React, { useEffect, useState } from 'react';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { useSelector } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';
import { useLazyQuery } from '@apollo/client';
import { IconButton, Card, CardMedia, CircularProgress, Stack, Typography, Tooltip, Button } from '@mui/material';

import {
  Gallery,
  NewDialog,
  MediaDeleter,
  MediaUploader,
  NewDialogTitle,
  NewDialogContent,
  NewDialogActions,
  DialogChildButton,
} from 'components';

const MediaAssignment = ({ id, title, subheader, model, children }) => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [current, setCurrent] = useState([]);
  const { userToken } = useSelector((state) => state.auth);

  const [getCurrent, { loading }] = useLazyQuery(graph.current.query, {
    context: {
      serviceName: graph.current.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const refetch = () => setRefresh((prev) => !prev);

  const handleModelMedia = async () => {
    try {
      const { data } = await getCurrent({
        variables: {
          ids: id,
        },
      });
      if (!isEmptyObject(data)) {
        setCurrent(data[graph.current.name].data[0]?.media || []);
      }
    } catch (error) {}
  };

  useEffect(() => {
    open && handleModelMedia();
  }, [open, refresh]);

  return (
    <>
      <DialogChildButton
        title="رسانه ها"
        onClick={onOpen}
        size="small"
        color="warning"
        children={children}
        icon={<ImageRoundedIcon fontSize="small" color="warning" />}
      />
      <NewDialog label="رسانه ها" open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title="رسانه ها" onClose={onClose} />
        <NewDialogContent>
          <Handler
            title={title}
            subheader={subheader}
            current={current}
            model={model}
            modelId={id}
            refetch={refetch}
            loading={loading}
          />
        </NewDialogContent>
        <NewDialogActions>
          <Tooltip title="تازه سازی">
            <IconButton sx={{ bgcolor: 'action.selected', color: '#fff' }} size="medium" onClick={refetch}>
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                <RefreshRoundedIcon color="inherit" fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Gallery model={model} modelId={id} refetch={refetch} />
          <MediaUploader model={model} modelId={id} refetch={refetch} />
        </NewDialogActions>
      </NewDialog>
    </>
  );
};

function Handler({ title, subheader, current, model, modelId, refetch, loading }) {
  if (loading) {
    return <Loading />;
  }
  if (!current.length) {
    return <NotFound title={title} subheader={subheader} />;
  }
  return <Content current={current} model={model} modelId={modelId} refetch={refetch} />;
}

function Loading() {
  return (
    <Stack minHeight={400} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
}
function NotFound({ title, subheader }) {
  const searchInGoogle = () => {
    window.open(`https://www.google.com/search?q=${title}+${subheader}`, '_blank');
  };
  return (
    <Stack minHeight={400} justifyContent="center" alignItems="center">
      <img width={280} src="/assets/images/not-found.jpg" />
      <Typography variant="caption" color="text.disabled">
        موردی یافت نشد
      </Typography>
      <Button sx={{ mt: 1, minWidth: 180 }} variant="outlined" onClick={searchInGoogle}>
        جستجوی تصویر در گوگل
      </Button>
    </Stack>
  );
}

function Content({ current, model, modelId, refetch }) {
  return (
    <Stack minHeight={400} rowGap={1}>
      {current.map((item, i) => {
        const { id, name, size, full_url, collection_name } = item;
        return (
          <Card key={i} variant="outlined" sx={{ display: 'flex' }}>
            <CardMedia component="img" sx={{ width: 120 }} image={full_url} alt={name} />
            <Stack flex={1} p={1} rowGap={1} alignItems="flex-end">
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle1" fontSize={14} color="text.secondary">
                {`${size} کیلوبایت`}
              </Typography>
              <MediaDeleter model={model} modelId={modelId} mediaId={id} refetch={refetch} />
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}

export default MediaAssignment;
