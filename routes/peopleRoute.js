const express = require('express');
const controller = require("../controllers/peopleController");
const { authorize } = require('../middleware/auth.middleware');
const {createPerson, getPerson, updatePerson, deletePerson} = require("../validations/peopleValidation");

const router = express.Router();

router.param('id', controller.load);

router
  .route('/')
  // Create
  .post(authorize(["admin"]), controller.create)
  // Retrieve
  .get(controller.list)

  router
  .route('/:id')
  // Retrieve
  .get(controller.get)
  // Update
  .patch(authorize(["admin"]), controller.update)
  // Delete
  .delete(authorize(["admin"]), controller.delete)

module.exports = router;
