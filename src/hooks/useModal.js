import React from 'react';

export default function useModal() {
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
    body,
    setBody
  };
}
