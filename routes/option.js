const express = require('express');
const router = express.Router();

const optionController = require('../controllers/options_controller');

router.post('/:id/add_vote', optionController.addVote);
router.delete('/:id/delete', optionController.destroy);

module.exports = router;