const Data = require('../models/dataModels');

module.exports.getAllData = async (req, res) => {
  const data = await Data.find({});

  res.status(200).json({
    status: 'success',
    results: data.length,
    data
  });

}

module.exports.dashBoard = async(req, res) => {
  const data = await Data.find({});
  res.status(200).render('dashboard', {
    title: `Dashboard `,
    data
  });
}

module.exports.deletaAllData = async (req, res) => {
  Data.deleteMany({}, (error)=> {
    if(error) {
      console.log(error);
    }

    console.log("Successful deletion");
    
  });
  res.status(201).json({
    status: 'success deleted'
  });
}

module.exports.updateData = async (req, res, next) => {
  const realSN = '11011000';
  const values = req.query.data.split('*');
  const SerialNumber = values[0];
  const Temperature = values[1];
  const Humidity = values[2];
  const LPG = values[3];
  const Co = values[4];
  const smoke = values[5];
  const buzzerStatus = values[6];

  const data = new Data({
    SerialNumber,
    Temperature, 
    Humidity,
    LPG,
    Co,
    smoke,
    buzzerStatus,
    createdAt: new Date().toISOString()
  });

  await data.save();
  res.status(200).json({
    status: 'success',
    data
  });

}