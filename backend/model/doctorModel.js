import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
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

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
