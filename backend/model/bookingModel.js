import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clinic',
  },
  bookingId: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNo: String,
  address: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
