const express = require('express');
const controller = require("../controllers/peopleController");
const {createPerson, getPerson, updatePerson, deletePerson} = require("../validations/peopleValidation");

const router = express.Router();

router.param('id', controller.load);

router
  .route('/')
  // Create
  .post(controller.create)
  // Retrieve
  .get(controller.list)

  router
  .route('/:id')
  // Retrieve
  .get(controller.get)
  // Update
  .patch(controller.update)
  // Delete
  .delete(controller.delete)

module.exports = router;
