import mongoose from 'mongoose';

const clinicSchema = mongoose.Schema({
  name: String,
  email: String,
  phoneNo1: String,
  phoneNo2: String,
  address: String,
  bookingInterval: String,
  selectedImage: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic;
