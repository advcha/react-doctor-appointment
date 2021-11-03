import express from 'express';
import connectDB from './config/db.js';
connectDB();

import doctorRoutes from './router/doctor.js';
import clinicRoutes from './router/clinic.js';
import bookingRoutes from './router/booking.js';
import authRoutes from './router/auth.js';
import settingRoutes from './router/setting.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/doctor', doctorRoutes);
app.use('/clinic', clinicRoutes);
app.use('/booking', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/setting', settingRoutes);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
