const httpStatus = require("http-status");
const DBOperations = require("../mongoose/db");
const logger = require("../utils/logger");

exports.load = (req, res, next, id) => {
  logger.debug(`retrieving id: ${id}`);
  return next();
};

exports.list = async (req, res, next) => {
  try {
    const data = await DBOperations.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await DBOperations.get(id);
      if(data) {
        res.json(data);
      } else {
        res.status(httpStatus.NOT_FOUND);
        res.json("id not found")
      }
    } catch (error) {
      next(error);
    }
  };

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const finalData = await DBOperations.createData(data)
    res.status(httpStatus.CREATED);
    res.json(finalData);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const upd = await DBOperations.updateData(id, data)
    if(upd){
      res.status(httpStatus.OK);
      res.json(upd);
    } else {
      res.status(httpStatus.NOT_FOUND);
      res.json("id not found")
    }
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await DBOperations.deleteData(id);
    if(deleted) res.status(httpStatus.NO_CONTENT).end();
    res.status(httpStatus.NOT_FOUND);
    res.json("id not found")
  } catch (e) {
    next(e);
  }
};
