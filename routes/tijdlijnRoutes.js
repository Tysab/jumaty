var express = require('express');
var router = express.Router();
var tijdlijnController = require('../controllers/tijdlijnController.js');

/*
 * GET
 */
router.get('/', tijdlijnController.list);

/*
 * GET
 */
router.get('/:id', tijdlijnController.show);

/*
 * POST
 */
router.post('/', tijdlijnController.create);

/*
 * PUT
 */
router.put('/:id', tijdlijnController.update);

/*
 * DELETE
 */
router.delete('/:id', tijdlijnController.remove);

module.exports = router;
