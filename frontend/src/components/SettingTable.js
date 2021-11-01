import React from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSetting, deleteSettings } from '../actions/settingActions';

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

const SettingTable = ({ handleClickOpen, handleClinicOpen, handleDoctorOpen, handleSettingOpen, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);

  const delSetting = (id) => {
    dispatch(deleteSetting(id));
  };

  const delSettings = (idArr) => {
    dispatch(deleteSettings(idArr));
  };

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.addBooking}
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentId(0);
            handleSettingOpen();
          }}
        >
          Add Setting
        </Button>
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
          onClick={handleClickOpen}
        >
          Show Booking
        </Button>
      </div>
      <Card>
        <MaterialTable
          title='Setting Details'
          columns={[
            { title: 'Setting Name', field: 'name' },
            { title: 'Setting Value', field: 'nameValue' },
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
                        handleSettingOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='secondary'
                      onClick={() => {
                        if(window.confirm('Are you sure to delete this data?')){
                          delSetting(rowData._id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
            },
          ]}
          data={settings}
          actions={[
            {
              tooltip: 'Remove All Selected Data',
              icon: 'delete',
              onClick: (evt, data) => delSettings(data.map((a) => a._id)),
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

export default SettingTable;
