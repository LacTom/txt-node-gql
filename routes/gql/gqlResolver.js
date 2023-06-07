const DBOperations = require("../../mongoose/db");
const logger = require("../../utils/logger");

const gqlResolver = {
  Query: {
    list: async () => {
      try {
        return await DBOperations.getAll();
      } catch (e) {
        logger.error(e);
        throw new Error(e);
      }
    },
    get: async (root, {id}) => {
      try {
        console.log(id)
        return await DBOperations.get(id);
      } catch (e) {
        logger.error(e);
        throw new Error(e);
      }
    },
  },
  Mutation: {
    create: async (root, { data }) => {
      try {
        return await DBOperations.createData(data);
      } catch (e) {
        logger.error(e);
        throw new Error(e);
      }
    },
    update: async (root, { id, data }) => {
      try {
        return await DBOperations.updateData(id, data);
      } catch (e) {
        logger.error(e);
        throw new Error(e);
      }
    },
    delete: async (root, {id}) => {
      try {
        const deleted = await DBOperations.deleteData(id);
        return deleted ? "OK" : "KO";
      } catch (e) {
        logger.error(e);
        throw new Error(e);
      }
    },
  },
};

module.exports = gqlResolver;
