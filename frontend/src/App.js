import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Doctor from './pages/Doctor';
import Auth from './pages/Auth';

function App() {
  return (
    <Container>
      <Router>
        <Route path='/' exact component={Auth} />
        <Route path='/booking' exact component={Booking} />
        <Route path='/doctor' exact component={Doctor} />
      </Router>
    </Container>
  );
}

export default App;
