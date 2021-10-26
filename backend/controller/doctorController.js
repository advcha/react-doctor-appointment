import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Doctor from '../model/doctorModel.js';

const createDoctor = asyncHandler(async (req, res) => {
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  console.log(req.body);

  const newDoctor = new Doctor({
    name,
    email,
    phoneNo1,
    phoneNo2,
    address,
    selectedImage,
  });

  try {
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Incorrect ID');
  }
  await Doctor.findByIdAndRemove(id);
  res.json({ message: 'Doctor deleted successfully.' });
});

const deleteMultiDoctors = asyncHandler(async (req, res) => {
  if (req.body.length > 0) {
    await Doctor.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: 'Doctors are deleted successfully.' });
  } else {
    res.status(400).json({ message: 'No Ids found' });
  }
});

const updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Doctor with id: ${id}`);

  const existDoctor = await Doctor.findById(id);
  existDoctor.name = name || existDoctor.name;
  existDoctor.email = email || existDoctor.email;
  existDoctor.phoneNo1 = phoneNo1 || existDoctor.phoneNo1;
  existDoctor.phoneNo2 = phoneNo2 || existDoctor.phoneNo2;
  existDoctor.address = address || existDoctor.address;
  existDoctor.selectedImage = selectedImage || existDoctor.selectedImage;

  const updatedDoctor = await existDoctor.save();

  res.json(updatedDoctor);
});

export {
  createDoctor,
  getDoctors,
  deleteDoctor,
  deleteMultiDoctors,
  updateDoctor,
};
