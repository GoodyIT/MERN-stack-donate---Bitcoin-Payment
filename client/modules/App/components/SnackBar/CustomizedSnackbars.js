import React, { Component } from 'react';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const styles = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });

const MySnackbarContentWrapper = (obj) => {
    const { className, message, onClose, variant, ...other } = obj;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={classNames(styles[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={styles.message}>
            <Icon className={classNames(styles.icon, styles.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={styles.close}
            onClick={onClose}
          >
            <CloseIcon className={styles.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
};
  
class CustomizedSnackbars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        const { message, handleClose, open } = this.props;
  
      return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className="p-2"
                onClick={handleClose}
                >
                <CloseIcon />
                </IconButton>,
            ]}
        />
      );
    }
  }

export default CustomizedSnackbars;
