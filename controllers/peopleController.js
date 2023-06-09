const fs = require("fs");
const promises = require('fs').promises;
const httpStatus = require("http-status");
const path = require("path");
const filePath = path.join(__dirname, "../mocks");
const logger = require("../utils/logger");

const getDBData = () => {
  let rawdata = fs.readFileSync(`${filePath}/peopleMock.json`);
  let finalData = JSON.parse(rawdata);
  return finalData;
};

const writeDBData = (data) => {
  fs.writeFileSync(`${filePath}/peopleMock.json`, JSON.stringify(data));
};

const getAsyncDBData = async () => {
  let rawdata = await promises.readFile(`${filePath}/peopleMock.json`);
  let finalData = JSON.parse(rawdata);
  return finalData;
};

const writeAsyncDBData = async (data) => {
  await promises.writeFile(`${filePath}/peopleMock.json`, JSON.stringify(data));
};

exports.load = (req, res, next, id) => {
  logger.debug(`retrieving id: ${id}`);
  return next();
};

exports.get = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = getDBData();
    const person = data.find((e) => e.id === id);
    if (person) {
      res.status(httpStatus.OK);
      res.json(person);
    } else {
      logger.error(`id: ${id} not found!`)
      next(new Error(`id: ${id} not found!`));
      //res.status(httpStatus.NOT_FOUND);
      //res.json("Id not found");
    }
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const oldData = await getAsyncDBData();
    const nextId = oldData.length + 1;
    const finalData = {
      ...data,
      id: nextId,
    }
    oldData.push(finalData);
    await writeAsyncDBData(oldData);
    res.status(httpStatus.CREATED);
    res.json(finalData);
  } catch (e) {
    next(e);
  }
};

exports.update = (req, res, next) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id, 10);
    const oldData = getDBData();
    const toUpdate = oldData.find((e) => e.id === id);
    if (toUpdate) {
      Object.assign(toUpdate, data);
      writeDBData(oldData);
      res.status(httpStatus.OK);
      res.json(toUpdate);
    } else {
      logger.warn(`id: ${id} was not found, thus it couldn't be updated`);
      res.status(httpStatus.NOT_FOUND);
      res.json("Id not found");
    }
  } catch (e) {
    next(e);
  }
};

exports.list = (req, res, next) => {
  try {
    const data = getDBData();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const oldData = getDBData();
    const toRemove = oldData.findIndex((e) => e.id === id);
    if (toRemove > -1) {
      oldData.splice(toRemove, 1);
      writeDBData(oldData);
      res.status(httpStatus.NO_CONTENT).end();
    } else {
      logger.warn(`id: ${id} was not found, thus it couldn't be deleted`);
      res.status(httpStatus.NOT_FOUND);
      res.json("id not found")
    }
  } catch (e) {
    next(e);
  }
};
