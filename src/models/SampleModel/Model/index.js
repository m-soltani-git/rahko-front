import React from 'react';
import Update from '../Update';
import Media from '../Media';

import { Card, Stack, Slide, Divider, Checkbox, Typography, CardHeader, CardActionArea } from '@mui/material';
import { AvatarPopover, NewSpeedDial } from 'components';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

export default function Model({ model, delay, direction, checked, handleSelect, refetch }) {
  const {
    language: { direction: dir },
  } = useSelector((state) => state.setting);
  const isRtl = dir === 'rtl';
  return (
    <>
      <Slide
        in
        unmountOnExit
        direction={direction}
        timeout={{ appear: delay * 150, enter: delay * 170, exit: delay * 190 }}
      >
        <Card
          sx={{
            position: 'relative',
            bgcolor: checked && 'action.disabledBackground',
          }}
        >
          <Stack
            left={8}
            zIndex={1}
            columnGap={0.5}
            height="100%"
            alignItems="center"
            position="absolute"
            justifyContent="flex-start"
            direction={isRtl ? 'row' : 'row-reverse'}
          >
            <Checkbox size="small" checked={checked} onChange={handleSelect} />
            <Media id={model.id} collection="avatar" title={model.title} subheader={model?.title || ''}>
              <AvatarPopover media={model?.media[0]?.full_url} />
            </Media>
          </Stack>
          <Stack
            right={8}
            zIndex={1}
            columnGap={0.5}
            height="100%"
            direction="row"
            alignItems="center"
            position="absolute"
            justifyContent="flex-end"
          >
            <NewSpeedDial>
              <Update ids={model.id} title={<FormattedMessage id="update" />} refetch={refetch} />
              <Media id={model.id} model="Brand" collection="banner" />
            </NewSpeedDial>
          </Stack>
          <CardActionArea onClick={handleSelect}>
            <CardHeader
              sx={{ px: 0.5, pl: 13 }}
              title={
                <Typography textAlign={isRtl ? 'start' : 'end'} fontSize={14} variant="subtitle1">
                  {model.title}
                </Typography>
              }
              subheader={
                <Typography fontSize={12} variant="subtitle2">
                  {model?.title}
                </Typography>
              }
            />
          </CardActionArea>
        </Card>
      </Slide>
      <Divider variant="middle" />
    </>
  );
}
