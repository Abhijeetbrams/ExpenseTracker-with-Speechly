import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';

// this snackbar is used to show the Notification after every creation of 
// transaction and setting state which will be resetted to false means to
// hide the Snackbar after 6 sec or when user manually click on close.
const CustomizedSnackbar = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">Transaction successfully created.</MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbar;