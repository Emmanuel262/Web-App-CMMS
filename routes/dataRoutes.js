const { Router } = require('express');
const authController = require('../controllers/authControllers');
const dataController = require('../controllers/dataControllers');

const router = Router();

router.get('/all-data', dataController.getAllData);
router.get('/update-data', dataController.updateData);
router.get('/dashboard', dataController.dashBoard);
router.delete('/delete-data', dataController.deletaAllData);
module.exports = router;