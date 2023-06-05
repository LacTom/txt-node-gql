const express = require('express');
const controller = require("../controllers/sqlLiteController");
const { authorize } = require('../middleware/auth.middleware');
const {createPerson, getPerson, updatePerson, deletePerson} = require("../validations/peopleValidation");
// const { validate } = require('../middleware/joi.middleware');
const { validate } = require('express-validation')

const router = express.Router();

router.param('id', controller.load);

router
  .route('/')
  // Create
  .post(authorize(["admin"]), validate(createPerson), controller.create)
  // Retrieve
  .get(controller.list)

  router
  .route('/:id')
  // Retrieve
  .get(validate(getPerson), controller.get)
  // Update
  .patch(authorize(["admin"]), validate(updatePerson, {}, {}), controller.update)
  // Delete
  .delete(authorize(["admin"]), validate(deletePerson), controller.delete)

module.exports = router;
