import React from 'react';
import moment from 'moment';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  TextareaAutosize,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ChatBubbleOutline, Telegram, Close, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: '900px',
  },
  patientName: {
    fontSize: '24px',
    fontWeight: '700',
  },
  patientLastName: {
    textTransform: 'uppercase',
  },
  doctorName: {
    fontSize: '16px',
    fontWeight: 'normal',
  },
  gridContent: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    padding: '8px',
    marginTop: '10px',
    alignItems: 'center',
  },
  infoText: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgb(194, 194, 194)',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  infoValue1: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
    width: '50%',
  },
  buttonInfo: {
    fontSize: '14px',
    backgroundColor: 'rgb(247, 247, 247)',
    fontWeight: 'normal',
    borderRadius: '10px',
    textTransform: 'none',
  },
  navBar: {
    color: 'rgb(194, 194, 194)',
    textAlign: 'right',
  },
  btnNavBar: {
    padding: '0',
    minWidth: '32px',
  },
  buttonDownload: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
    textTransform: 'none',
  },
  commentText: {
    alignItems: 'center',
  },
  commentBox: {
    backgroundColor: 'rgb(194, 194, 194)',
    borderRadius: '10px',
    alignItems: 'center',
  },
  commentButton: {
    backgroundColor: 'rgb(24, 186, 240)',
    color: '#ffffff',
    borderRadius: '20px',
    alignItems: 'center',
    padding: '2px 3px 2px 1px',
    marginLeft: '10px',
    verticalAlign: 'middle',
  }
}));

const BookingInfo = ({ open, bookingSelected, closeInfo }) => {
  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    closeInfo();
  }

  return (
    <Dialog
      open={open}
      onClose={closeInfo}
      aria-labelledby='form-dialog-title' 
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id='form-dialog-title'>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonInfo}>
              Mark as confirmed
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonInfo}>
              Send Missed Call Text
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.navBar}>
            <Button className={classes.btnNavBar} onClick={handleSubmit}>
              <Edit style={{ color: 'rgb(194, 194, 194)' }} />
            </Button>
            <Button className={classes.btnNavBar} onClick={closeInfo}>
              <Close style={{ color: 'rgb(194, 194, 194)' }} />
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={12} md={12} className={classes.patientName}>
            <span>{bookingSelected.firstName}&nbsp;</span>
            <span className={classes.patientLastName}>{bookingSelected.lastName}</span>'s&nbsp;
            <span>{bookingSelected.bookingType}</span>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.doctorName}>
            <span>{bookingSelected.doctor ? bookingSelected.doctor.name : ''}</span>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
          className={classes.gridContent}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Typography className={classes.infoText}>
              Booking Type
            </Typography>
            <Typography className={classes.infoValue}>
              {bookingSelected.bookingType}
            </Typography>
            <Typography className={classes.infoText}>
              Booking Date/Time
            </Typography>
            <Typography className={classes.infoValue1}>
              {moment(bookingSelected.bookingDateTime).format('MM/DD/YYYY')}
            </Typography>
            <Typography className={classes.infoValue1}>
              {moment(bookingSelected.bookingDateTime).format('HH:mm')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonDownload}>
              Download Patient Info Form
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
          className={classes.gridContent}
        >
          <Grid item xs={12} sm={12} md={12} className={classes.commentText}>
            <Typography className={classes.infoText}>
              <ChatBubbleOutline 
                style={{ verticalAlign: 'middle' }}
              /> Comment
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.commentBox}>
            <TextareaAutosize
              aria-label='minimum height'
              placeholder='Write a comment'
              style={{ minHeight: 50, width: '90%', verticalAlign: 'middle' }}
            />
            <Telegram className={classes.commentButton} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookingInfo;
