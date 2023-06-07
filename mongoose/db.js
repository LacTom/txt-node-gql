const logger = require("../utils/logger");
const mongoose = require("mongoose");
const peopleMock = require("../mocks/peopleMock.json");
const { BUs } = require("../config/techBUs");
mongoose.connect("mongodb://127.0.0.1:27017/people");

const PersonSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  knowsNodeJs: { type: Boolean, default: false },
  BU: { type: String, enum: BUs },
  city: String,
});

const Person = mongoose.model("people", PersonSchema);

const initDBData = () => {
  try {
    (async () => {
      await Person.deleteMany();
      await Person.insertMany(peopleMock);
    })();
  } catch (e) {
    logger.error(e);
  }
};

const getAll = async () => {
  return await Person.find({});
};

const get = async (id) => {
  return await Person.findById(new mongoose.Types.ObjectId(id));
};

const createData = async (data) => {
  return await Person.create(data);
};

const updateData = async (id, data) => {
  try {
    return await Person.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      data,
      { returnDocument: "after" }
    );
  } catch (e) {
    logger.error(e);
  }
};

const deleteData = async (id) => {
  try {
    return await Person.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  } catch (e) {
    logger.error(e);
  }
};

// run init db on startup
initDBData();

const DBOperations = {
  getAll,
  get,
  updateData,
  createData,
  deleteData,
  initDBData,
};

module.exports = DBOperations;
