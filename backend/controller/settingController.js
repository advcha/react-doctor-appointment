import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Setting from '../model/settingModel.js';

const createSetting = asyncHandler(async (req, res) => {
  const { name, nameValue } = req.body;

  const newSetting = new Setting({
    name,
    nameValue,
  });

  try {
    await newSetting.save();
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find();
  res.json(settings);
});

const deleteSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Incorrect ID');
  }
  await Setting.findByIdAndRemove(id);
  res.json({ message: 'Setting deleted successfully.' });
});

const deleteMultiSettings = asyncHandler(async (req, res) => {
  if (req.body.length > 0) {
    await Setting.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: 'Settings are deleted successfully.' });
  } else {
    res.status(400).json({ message: 'No Ids found' });
  }
});

const updateSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, nameValue } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Setting with id: ${id}`);

  const existSetting = await Setting.findById(id);
  existSetting.name = name || existSetting.name;
  existSetting.nameValue = nameValue || existSetting.nameValue;

  const updatedSetting = await existSetting.save();

  res.json(updatedSetting);
});

export {
  createSetting,
  getSettings,
  deleteSetting,
  deleteMultiSettings,
  updateSetting,
};
