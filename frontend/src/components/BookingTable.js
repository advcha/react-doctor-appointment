import React from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, deleteBookings } from '../actions/bookingActions';

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
  console.log(bookings);

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
          onClick={handleClickOpen}
        >
          Add Booking
        </Button>
      </div>
      <Card>
        <MaterialTable
          title='Booking Details'
          columns={[
            {
              title: 'Image',
              field: 'selectedImage',
              render: (rowData) => (
                rowData.selectedImage && (
                <img
                  alt='Userimage'
                  style={{ height: 50, borderRadius: '50%' }}
                  src={rowData.selectedImage}
                />
                )
              ),
            },
            { title: 'Name', field: 'name' },
            { title: 'Email ID', field: 'email' },
            { title: 'Phone No', field: 'phoneNo1' },
            { title: 'Alt Phone No', field: 'phoneNo2' },
            { title: 'Address', field: 'address' },
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
