const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  SerialNumber: {
    type: String
  },
  Temperature: {
    type: String,
    default: 0
  },
  Humidity: {
    type: String,
    default: 0
  },
  LPG: {
    type: String,
    default: 0
  },
  Co: {
    type: String,
    default: 0
  },
  smoke: {
    type: String,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  buzzerStatus: {
    type: Boolean,
    default: false
  }

});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;