import React, { useState, useEffect } from 'react';

import {
  Box,
  Card,
  alpha,
  Stack,
  Button,
  Avatar,
  useTheme,
  Skeleton,
  Collapse,
  CardMedia,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

import { useSelector } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';
import { useLazyQuery } from '@apollo/client';
import { digitsEnToFa } from '@persian-tools/persian-tools';

import graph from './graph';

export default function Assignment({ title, selected, handleSelect, onAssign, onClose, assigning }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const { userToken } = useSelector((state) => state.auth);

  const onOpen = () => setOpen(!open);

  const [getData, { loading }] = useLazyQuery(graph.list.query, {
    context: {
      serviceName: graph.list.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleData = async () => {
    try {
      if (open) {
        const { data } = await getData({
          variables: {
            ids: selected.map((item) => item.id),
          },
        });
        if (!isEmptyObject(data)) {
          const res = data[graph.list.name];
          setResult(selected.length > 0 ? res : []);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleData();
  }, [selected, open]);

  return (
    <>
      <Card
        elevation={8}
        sx={{
          mx: 'auto',
          // left: { xs: 8, sm: 'auto' },
          left: 8,
          right: 8,
          bottom: 8,
          zIndex: 999,
          color: '#fff',
          position: 'fixed',
          transition: 'all 0.5s ease',
          width: { xs: 'calc(100vw - 16px)', sm: open ? 'calc(100vw - 16px)' : 360 },
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
          backgroundColor: alpha(theme.palette.info.main, 0.75),
        }}
      >
        <CardHeader
          sx={{ p: 1 }}
          title={
            <Typography fontSize={18} variant="subtitle1">
              مورد انتخاب شده
            </Typography>
          }
          avatar={
            <Avatar sx={{ bgcolor: 'warning.main', color: 'info.darker' }}>
              <Typography variant="h6">{digitsEnToFa(selected.length)}</Typography>
            </Avatar>
          }
          action={
            <IconButton
              sx={{ color: 'info.darker', width: 32, height: 32 }}
              color="info"
              disabled={selected.length === 0}
              onClick={onOpen}
            >
              {loading ? (
                <CircularProgress color="inherit" size={18} />
              ) : open ? (
                <FullscreenExitRoundedIcon fontSize="small" />
              ) : (
                <FullscreenRoundedIcon fontSize="small" />
              )}
            </IconButton>
          }
        />
        <Collapse in={open} timeout="auto" mountOnEnter>
          <CardContent sx={{ p: 1 }}>
            <Stack direction="row" columnGap={0.5}>
              <Box
                sx={{
                  py: 0,
                  borderRadius: 2,
                  columnGap: 2,
                  width: '100%',
                  display: 'flex',
                  scrollPadding: 24,
                  overflowY: 'hidden',
                  scrollbarWidth: 'none',
                  scrollBehavior: 'smooth',
                  scrollSnapType: 'x mandatory',
                  overflowX: 'scroll !important',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {loading
                  ? selected.map((item, i) => (
                      <Skeleton
                        sx={{ minWidth: 200, height: 148, borderRadius: 2, bgcolor: '#fff' }}
                        key={i}
                        variant="rounded"
                      />
                    ))
                  : result.map((item, i) => {
                      const { id, title, producer, media } = item;
                      const img = media ? media[0]?.full_url : '/assets/images/picture.png';
                      return (
                        <Box key={i} sx={{ scrollSnapAlign: 'center' }}>
                          <Card sx={{ width: 200, height: 148, flexDirection: 'row' }}>
                            <CardMedia
                              sx={{
                                height: 96,
                                backgroundSize: 'contain',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                p: 1,
                              }}
                              image={img}
                              alt={title}
                            >
                              <IconButton size="small" onClick={() => handleSelect({ id, title })}>
                                <Delete fontSize="small" color="error" />
                              </IconButton>
                            </CardMedia>
                            <CardHeader
                              sx={{ p: 1 }}
                              title={
                                <Typography fontSize={14} variant="subtitle1">
                                  {title}
                                </Typography>
                              }
                              subheader={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography fontSize={12} variant="subtitle1">
                                    {producer?.title}
                                  </Typography>
                                </Stack>
                              }
                            />
                          </Card>
                        </Box>
                      );
                    })}
              </Box>
            </Stack>
          </CardContent>
        </Collapse>
        <CardActions sx={{ py: 1, justifyContent: 'flex-end' }}>
          <Button
            sx={{ flex: 1, bgcolor: '#ffffff33', maxWidth: 120 }}
            size="medium"
            color="inherit"
            variant="outlined"
            onClick={onClose}
          >
            لغو
          </Button>
          <Button
            size="large"
            color="warning"
            variant="contained"
            disabled={assigning}
            onClick={() => onAssign(selected, onClose)}
          >
            {title || 'اختصاص'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
