var express = require('express');
var router = express.Router();
var uploadsController = require('../controllers/uploadsController.js');

/*
 * GET
 */
router.get('/', uploadsController.list);

/*
 * GET
 */
router.get('/:id', uploadsController.show);

/*
 * POST
 */
router.post('/', uploadsController.create);

/*
 * PUT
 */
router.put('/:id', uploadsController.update);

/*
 * DELETE
 */
router.delete('/:id', uploadsController.remove);

module.exports = router;
