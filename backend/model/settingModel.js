import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
  name: String,
  nameValue: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
