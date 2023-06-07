const DBOperations = require("../../mongoose/db");
const logger = require("../../utils/logger");

const gqlResolver = {
  list: async () => {
    try {
      return await DBOperations.getAll();
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
  get: async (id) => {
    try {
      return await DBOperations.get(id);
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
  create: async ({data}) => {
    try {
      return await DBOperations.createData(data);
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
  update: async ({id, data}) => {
    try {
        return await DBOperations.updateData(id, data);
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
  delete: async (id) => {
    try {
      const deleted = await DBOperations.deleteData(id);
      return deleted ? "OK" : "KO";
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
};

module.exports = gqlResolver;
