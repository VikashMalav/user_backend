const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
   
  },
  email: { type: String, required: true, unique: true },
  message: String
}, { timestamps: true });

module.exports = mongoose.model('User_details', userSchema);
