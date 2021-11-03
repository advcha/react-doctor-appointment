import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Booking from './pages/Booking';
import Doctor from './pages/Doctor';
import Clinic from './pages/Clinic';
import Setting from './pages/Setting';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import Appointment from './pages/Appointment';

function App() {
  return (
    <Container maxWidth='xl'>
      <Router>
        <Route path='/' exact component={LandingPage} />
        <Route path='/appointment/:id' exact component={Appointment} />
        <Route path='/login' exact component={Auth} />
        <Route path='/booking' exact component={Booking} />
        <Route path='/doctor' exact component={Doctor} />
        <Route path='/clinic' exact component={Clinic} />
        <Route path='/setting' exact component={Setting} />
      </Router>
    </Container>
  );
}

export default App;
