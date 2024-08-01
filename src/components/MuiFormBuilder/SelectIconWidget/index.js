import React, { useState } from "react";
import iconList from './iconList';
import { getError } from "../utils";
import { Avatar, Button, Card, CardActionArea, CardMedia, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconWidget = props => {
  const { id, required, schema, value, onChange, rawErrors, options } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (file) => {
    onChange(file)
    handleClose()
  };

  return (
    <>
      <Button
        disabled={schema.disabled}
        variant="outlined"
        fullWidth
        color={!value ? 'primary' : 'secondary'}
        sx={{ py: 2, justifyContent: 'space-between', alignItems: 'center' }}
        onClick={handleClickOpen}
        endIcon={<Avatar sx={{ width: 28, height: 28, objectFit: 'cover' }} src={value ? `/assets/icons/${value}.png` : '/assets/images/picture.png'} />}
      >
        <Typography variant="subtitle2" sx={{ mx: 1 }}>
          {schema.title}
        </Typography>
      </Button>
      {getError(rawErrors)}
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth={true}
        onClose={handleClose}
        sx={{ direction: 'ltr' }}
        TransitionComponent={Transition}
      >
        <DialogTitle onClose={handleClose}>{`انتخاب ${schema.title}`}</DialogTitle>
        <DialogContent>
          <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={1}>
            {iconList.map((media, i) => (
              <Card key={i} variant='outlined' sx={{ border: value === media.id ? '1px solid green' : 'none' }}>
                <CardActionArea onClick={() => handleChange(media.id)}>
                  <CardMedia
                    title={media.name}
                    image={`/assets/icons/${media.name}`}
                    sx={{ opacity: value === media.id ? 0.5 : 1, width: 54, height: 54, backgroundSize: 'cover' }}
                  />
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IconWidget;