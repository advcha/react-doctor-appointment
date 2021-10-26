import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Booking from '../model/bookingModel.js';

const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  console.log(req.body);

  const newBooking = new Booking({
    name,
    email,
    phoneNo1,
    phoneNo2,
    address,
    selectedImage,
  });

  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Incorrect ID');
  }
  await Booking.findByIdAndRemove(id);
  res.json({ message: 'Booking deleted successfully.' });
});

const deleteMultiBookings = asyncHandler(async (req, res) => {
  if (req.body.length > 0) {
    await Booking.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: 'Bookings are deleted successfully.' });
  } else {
    res.status(400).json({ message: 'No Ids found' });
  }
});

const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Booking with id: ${id}`);

  const existBooking = await Booking.findById(id);
  existBooking.name = name || existBooking.name;
  existBooking.email = email || existBooking.email;
  existBooking.phoneNo1 = phoneNo1 || existBooking.phoneNo1;
  existBooking.phoneNo2 = phoneNo2 || existBooking.phoneNo2;
  existBooking.address = address || existBooking.address;
  existBooking.selectedImage = selectedImage || existBooking.selectedImage;

  const updatedBooking = await existBooking.save();

  res.json(updatedBooking);
});

export {
  createBooking,
  getBookings,
  deleteBooking,
  deleteMultiBookings,
  updateBooking,
};
