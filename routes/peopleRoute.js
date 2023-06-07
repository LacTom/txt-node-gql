const express = require('express');
const controller = require("../controllers/peopleController");
const {createPerson, getPerson, updatePerson, deletePerson} = require("../validations/peopleValidation");
const {validate} = require("express-validation");
const router = express.Router();

router.param('id', controller.load);

router
  .route('/')
  // Create
  .post(validate(createPerson),controller.create)
  // Retrieve
  .get(controller.list)

  router
  .route('/:id')
  // Retrieve
  .get(validate(getPerson),controller.get)
  // Update
  .patch(validate(updatePerson),controller.update)
  // Delete
  .delete(validate(deletePerson),controller.delete)

module.exports = router;
