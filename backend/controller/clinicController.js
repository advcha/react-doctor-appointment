import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Clinic from '../model/clinicModel.js';

const createClinic = asyncHandler(async (req, res) => {
  const { name, email, phoneNo1, phoneNo2, address, bookingInterval, selectedImage } = req.body;

  const newClinic = new Clinic({
    name,
    email,
    phoneNo1,
    phoneNo2,
    address,
    bookingInterval,
    selectedImage,
  });

  try {
    await newClinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getClinics = asyncHandler(async (req, res) => {
  const clinics = await Clinic.find();
  res.json(clinics);
});

const deleteClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Incorrect ID');
  }
  await Clinic.findByIdAndRemove(id);
  res.json({ message: 'Clinic deleted successfully.' });
});

const deleteMultiClinics = asyncHandler(async (req, res) => {
  if (req.body.length > 0) {
    await Clinic.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: 'Clinics are deleted successfully.' });
  } else {
    res.status(400).json({ message: 'No Ids found' });
  }
});

const updateClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo1, phoneNo2, address, bookingInterval, selectedImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Clinic with id: ${id}`);

  const existClinic = await Clinic.findById(id);
  existClinic.name = name || existClinic.name;
  existClinic.email = email || existClinic.email;
  existClinic.phoneNo1 = phoneNo1 || existClinic.phoneNo1;
  existClinic.phoneNo2 = phoneNo2 || existClinic.phoneNo2;
  existClinic.address = address || existClinic.address;
  existClinic.bookingInterval = bookingInterval || existClinic.bookingInterval;
  existClinic.selectedImage = selectedImage || existClinic.selectedImage;

  const updatedClinic = await existClinic.save();

  res.json(updatedClinic);
});

export {
  createClinic,
  getClinics,
  deleteClinic,
  deleteMultiClinics,
  updateClinic,
};
