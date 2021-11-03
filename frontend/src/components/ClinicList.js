import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, CardHeader, CardContent, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  clinicImage: {
    textAlign: 'center'
  },
}));

const ClinicList = ({ open }) => {
  const classes = useStyles();

  const clinics = useSelector((state) => state.clinics);

  const goToAppointment = (e, id) => {
    e.preventDefault();
    document.location.href = '/appointment/' + id;
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        {clinics.map(c => (
          <Grid item xs={12} sm={6} md={3} key={clinics.indexOf(c)}>
            <Card>
              <CardHeader
                title={
                  <Link
                    to='#'
                    variant='body2'
                    onClick={(e) => {
                      goToAppointment(e, c._id);
                    }}
                    key={clinics.indexOf(c)}
                  >
                    {c.name}
                  </Link>
                }
                subheader={`phone : ${c.phoneNo1}`}
              />
              <CardContent className={classes.clinicImage}>
                <Link
                  to='#'
                  variant='body2'
                  onClick={(e) => {
                    goToAppointment(e, c._id);
                  }}
                  key={clinics.indexOf(c)}
                >
                  {c.selectedImage && (
                    <img
                      alt='Clinicimage'
                      style={{ height: 100 }}
                      src={c.selectedImage}
                    />
                  )}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ClinicList;
