import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Booking from '../model/bookingModel.js';
import moment from 'moment';

const createBooking = asyncHandler(async (req, res) => {
  const { doctor, clinic, bookingId, bookingType, firstName, lastName, email, phoneNo, address, age, gender, bookingDateTime, bookingNotes } = req.body;

  console.log(req.body);

  const newBooking = new Booking({
    doctor,
    clinic,
    bookingId,
    bookingType,
    firstName,
    lastName,
    email,
    phoneNo,
    address,
    age,
    gender,
    bookingDateTime,
    bookingNotes,
  });

  try {
    const createdBooking = await newBooking.save();
    const bookings = await Booking.findOne({_id:createdBooking._id}).populate(['doctor', 'clinic']);
    //res.status(201).json(newBooking);
    res.status(201).json(bookings);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getBookings = asyncHandler(async (req, res) => {
  //const bookings = await Booking.find();
  const bookings = await Booking.find().populate(['doctor', 'clinic']);
  res.json(bookings);
});

const getBookingsByClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const today = moment().format('YYYY-MM-DDTHH:mm');
  const twodaysAfter = moment().add(2, 'days').format('YYYY-MM-DDTHH:mm');
  const bookings = await Booking.find({
    clinic:id, 
    bookingDateTime:{
      $gte: today,
      $lte: twodaysAfter
    }}).sort({bookingDateTime:-1}).populate(['doctor', 'clinic']);
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
  const { doctor, clinic, bookingId, bookingType, firstName, lastName, email, phoneNo, address, age, gender, bookingDateTime, bookingNotes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Booking with id: ${id}`);

  const existBooking = await Booking.findById(id);
  existBooking.doctor = doctor || existBooking.doctor;
  existBooking.clinic = clinic || existBooking.clinic;
  existBooking.bookingId = bookingId || existBooking.bookingId;
  existBooking.bookingType = bookingType || existBooking.bookingType;
  existBooking.firstName = firstName || existBooking.firstName;
  existBooking.lastName = lastName || existBooking.lastName;
  existBooking.email = email || existBooking.email;
  existBooking.phoneNo = phoneNo || existBooking.phoneNo;
  existBooking.address = address || existBooking.address;
  existBooking.age = age || existBooking.age;
  existBooking.gender = gender || existBooking.gender;
  existBooking.bookingDateTime = bookingDateTime || existBooking.bookingDateTime;
  existBooking.bookingNotes = bookingNotes || existBooking.bookingNotes;

  const updatedBooking = await existBooking.save();
  const bookings = await Booking.findOne({_id:id}).populate(['doctor', 'clinic']);
  //res.json(updatedBooking);
  res.json(bookings);
});

export {
  createBooking,
  getBookings,
  deleteBooking,
  deleteMultiBookings,
  updateBooking,
  getBookingsByClinic,
};
