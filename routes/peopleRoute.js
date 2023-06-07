const express = require('express');
const controller = require("../controllers/peopleController");
const { authorize } = require('../middleware/auth.middleware');
const {createPerson, getPerson, updatePerson, deletePerson} = require("../validations/peopleValidation");
// const { validate } = require('../middleware/joi.middleware');
const { validate } = require('express-validation');
const { ADMIN } = require('../config/configs');

const router = express.Router();

router.param('id', controller.load);

router
  .route('/')
  // Create
  .post(authorize([ADMIN]), validate(createPerson), controller.create)
  // Retrieve
  .get(controller.list)

  router
  .route('/:id')
  // Retrieve
  .get(validate(getPerson), controller.get)
  // Update
  .patch(authorize([ADMIN]), validate(updatePerson, {}, {}), controller.update)
  // Delete
  .delete(authorize([ADMIN]), validate(deletePerson), controller.delete)

module.exports = router;
