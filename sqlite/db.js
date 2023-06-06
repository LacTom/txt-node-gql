const logger = require("../utils/logger");
const { Sequelize, DataTypes } = require('sequelize');
// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("myDb.db");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "./myDb.db"
});

const Person = sequelize.define('people', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  knowsNodeJs: {
    type: DataTypes.BOOLEAN
  },
  BU: {
    type: DataTypes.ENUM,
    values: ["DIMI", "DINE"]
  },
  city: {
    type: DataTypes.STRING
  }
}, {
  createdAt: false,
  updatedAt: false
});

const initDBData = () => {
  try {
    (async () => {
    await sequelize.query("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, knowsNodeJs INTEGER, BU TEXT, city TEXT)");
    await sequelize.query("delete from people");
    await sequelize.query("INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (1, 'Judy','Garland',TRUE,'DIMI','Somewhere over the rainbow')");
    await sequelize.query("INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (2, 'Fred','Astair',FALSE,'DINE','Padua')");
    await sequelize.query("INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (3,'Marlon','Brando',FALSE,'LC','Turin')");
    await sequelize.query("INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (4,'Sofia','Loren',FALSE,'Self-employed','Milan')");
  })();
   /* if (db) {
      db.serialize(() => {
        db.run(
          "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, knowsNodeJs INTEGER, BU TEXT, city TEXT)"
        );
        db.run("delete from people");
        db.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (1, 'Judy','Garland',TRUE,'DIMI','Somewhere over the rainbow')"
        );
        db.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (2, 'Fred','Astair',FALSE,'DINE','Padua')"
        );
        db.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (3,'Marlon','Brando',FALSE,'LC','Turin')"
        );
        db.run(
          "INSERT INTO people (id, firstName, lastName, knowsNodeJs, BU, city) VALUES (4,'Sofia','Loren',FALSE,'Self-employed','Milan')"
        );
      });
    }*/
  } catch (e) {
    logger.error(e);
  }
};

const getAll = async () => {
  return await Person.findAll();
  /* const getData = new Promise((resolve, reject) => {
    db.all("SELECT * FROM people", function (err, rows) {
      if (err) {
        reject();
        logger.error(err);
      }
      resolve(rows);
    });
  });
  const results = await getData;
  return results; */
};

const get = async (id) => {
  return await Person.findByPk(id);
  /*const getData = new Promise((resolve, reject) => {
    db.get("SELECT * FROM people where id=?", id, (err, row) => {
      if (err) {
        reject();
        logger.error(err);
      }
      resolve(row);
    });
  });
  const results = await getData;
  return results;*/
};

const createData = async (data) => {
  return await Person.create(data);

  /* const created = new Promise((resolve, reject) => {
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
    db.run(query, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      const insertedData = await get(db, this.lastID);
      resolve(insertedData);
    });
  });
  return await created;
  */
};

const updateData = async (id, data) => {
  try{
    await Person.update(data, {
      where: {
        id
      }
    });
    return await Person.findByPk(id);
  }catch(e){
    logger.error(e);
  }

  /* const created = new Promise((resolve, reject) => {
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
    db.run(query, id, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      const updated = await get(db, id);
      resolve(updated);
    });
  });
  return await created;*/
};

const deleteData = async (id) => {
  return await Person.destroy({
    where: {
      id
    }
  });
  /*const created = new Promise((resolve, reject) => {
    const query = "delete from people where id = ?";
    db.run(query, id, async function(err) {
      if (err) {
        logger.error(err);
        reject();
      }
      resolve();
    });
  });
  return await created;*/
};


// run init db on startup
initDBData();

const DBOperations = {
  getAll,
  get,
  updateData,
  createData,
  deleteData,
  initDBData
};

module.exports = DBOperations;
