const logger = require("../utils/logger");
const sqlite3 = require("sqlite3").verbose();

let db;

const getDB = () => {
  try {
    if (!db) {
      db = new sqlite3.Database(":memory:");
      initDBData(db);
    }
    return db;
  } catch (e) {
    logger.error(e);
  }
};

const closeDB = async (myDb) => {
  try {
    if (myDb) {
      const { error } = await myDb.close();
      if (error) {
        logger.error(error);
      }
    }
  } catch (e) {
    logger.error(e);
  }
};

const initDBData = (myDb) => {
  try {
    if (myDb) {
      db.serialize(() => {
        myDb.run(
          "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, knowsNodeJs INTEGER, BU TEXT, city TEXT)"
        );
        myDb.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (1, 'Judy','Garland',TRUE,'DIMI','Somewhere over the rainbow')"
        );
        myDb.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (2, 'Fred','Astair',FALSE,'DINE','Padua')"
        );
        myDb.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (3,'Marlon','Brando',FALSE,'LC','Turin')"
        );
        myDb.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (4,'Sofia','Loren',FALSE,'Self-employed','Milan')"
        );
      });
    }
  } catch (e) {
    logger.error(e);
  }
};

const getAll = async (myDb) => {
  const getData = new Promise((resolve, reject) => {
    myDb.all("SELECT * FROM people", function (err, rows) {
      if (err) {
        reject();
        logger.error(err);
      }
      resolve(rows);
    });
  });
  const results = await getData;
  return results;
};

const get = async (myDb, id) => {
  const getData = new Promise((resolve, reject) => {
    myDb.get("SELECT * FROM people where id=?", id, (err, row) => {
      if (err) {
        reject();
        logger.error(err);
      }
      resolve(row);
    });
  });
  const results = await getData;
  return results;
};

const createData = async (mydb, data) => {
  const created = new Promise((resolve, reject) => {
    let query = "INSERT INTO people (";
    Object.keys(data).forEach((key, idx, arr) => {
      query = query.concat(key);
      if (idx !== arr.length - 1) {
        query = query.concat(",");
      }
    });
    query = query.concat(") values (");
    Object.values(data).forEach((value, idx, arr) => {
      query = query.concat(typeof value === "string" ? `'${value}'` : value);
      if (idx !== arr.length - 1) {
        query = query.concat(",");
      }
    });
    query = query.concat(")");
    logger.info(query);
    mydb.run(query, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      const insertedData = await get(db, this.lastID);
      resolve(insertedData);
    });
  });
  return await created;
};

const updateData = async (mydb, id, data) => {
  const created = new Promise((resolve, reject) => {
    let query = "UPDATE people set";
    Object.entries(data).forEach((entry, idx, arr) => {
      const key = entry[0];
      const value = entry[1];
      query = query.concat(`${key} = ${typeof value === "string" ? `'${value}'` : value}`);
      if (idx !== arr.length - 1) {
        query = query.concat(",");
      }
    });
    query = query.concat("where id = ?");
    logger.info(query);
    mydb.run(query, id, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      const updated = await get(db, id);
      resolve(updated);
    });
  });
  return await created;
};

const deleteData = async (mydb, id) => {
  const created = new Promise((resolve, reject) => {
    const query = "delete from people where id = ?";
    mydb.run(query, id, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      resolve();
    });
  });
  return await created;
};

const DBOperations = {
  getAll,
  get,
  updateData,
  createData,
  deleteData,
  initDBData,
  closeDB,
  getDB,
};

module.exports = DBOperations;
