import List from './List';
import React, { useState } from 'react';
import { DialogChildButton, NewDialog } from 'components';

export default function PopupHandler(props) {
  const { isPopup } = props;
  if (isPopup) {
    return <Popup {...props} />;
  }
  return <List {...props} />;
}

function Popup(props) {
  const [open, setOpen] = useState(false);
  const { title, disabled, setStartFetch, children } = props;

  const onOpen = () => {
    if (!disabled) {
      setOpen(true);
      setStartFetch(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogChildButton title={title} onClick={onOpen} children={children} />
      <NewDialog label={title} open={open} onClose={onClose}>
        <List onClose={onClose} {...props} />
      </NewDialog>
    </>
  );
}
