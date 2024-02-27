const express = require('express');
const questionController = require('../controllers/question_controller');
const optionController = require('../controllers/options_controller');
const router = express.Router();

router.post('/create', questionController.create);
router.post('/:id/options/create', optionController.create);
router.get('/:id', questionController.view);
router.delete('/:id/delete', questionController.destroy);

module.exports = router;