import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  name: String,
  email: String,
  phoneNo1: String,
  phoneNo2: String,
  address: String,
  selectedImage: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
