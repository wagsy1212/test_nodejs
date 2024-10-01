const express = require('express');
const courseController = require('../app/controllers/CourseController');
const router = express.Router();

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/update', courseController.update);
router.delete('/:id', courseController.delete);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.save);
router.get('/:slug', courseController.show);

module.exports = router;