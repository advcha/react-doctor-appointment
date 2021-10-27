import React from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, deleteBookings } from '../actions/bookingActions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: '10px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.96rem',
  },
  addBooking: {
    margin: theme.spacing(1),
    color: '#28aeee',
    backgroundColor: 'white',
    border: '1px solid #28aeee',
  },
}));

const BookingTable = ({ handleClickOpen, handleClinicOpen, handleDoctorOpen, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const delBooking = (id) => {
    dispatch(deleteBooking(id));
  };

  const delBookings = (idArr) => {
    dispatch(deleteBookings(idArr));
  };

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.addBooking}
          onClick={handleDoctorOpen}
        >
          Show Doctor
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.addBooking}
          onClick={handleClinicOpen}
        >
          Show Clinic
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.addBooking}
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentId(0);
            handleClickOpen();
          }}
        >
          Add Booking
        </Button>
      </div>
      <Card>
        <MaterialTable
          title='Booking Details'
          columns={[
            { title: 'Booking ID', field: 'bookingId' },
            {
              title: 'Patient Name',
              field: 'name',
              render: (rowData) => (
                rowData.firstName + ' ' + rowData.lastName
              ),
            },
            { 
              title: 'Booking Date', 
              field: 'bookingDateTime',
              render: (rowData) => (
                moment(rowData.bookingDateTime).format('MMM Do YYYY, h:mm A')
              ), 
            },
            { 
              title: 'Clinic', 
              field: 'clinic',
              render: (rowData) => (
                rowData.clinic.name
              ), 
            },
            { 
              title: 'Doctor', 
              field: 'doctor',
              render: (rowData) => (
                rowData.doctor.name
              ), 
            },
            {
              title: 'Edit/Delete',
              field: 'edit',
              render: (rowData) =>
                rowData && (
                  <>
                    <IconButton
                      color='primary'
                      onClick={() => {
                        setCurrentId(rowData._id);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='secondary'
                      onClick={() => {
                        if(window.confirm('Are you sure to delete this data?')){
                          delBooking(rowData._id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
            },
          ]}
          data={bookings}
          actions={[
            {
              tooltip: 'Remove All Selected Bookings',
              icon: 'delete',
              onClick: (evt, data) => delBookings(data.map((a) => a._id)),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true,
          }}
        />
      </Card>
    </>
  );
};

export default BookingTable;
