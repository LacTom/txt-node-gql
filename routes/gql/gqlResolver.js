const { GraphQLError } = require("graphql");
const DBOperations = require("../../mongoose/db");
const logger = require("../../utils/logger");

const gqlResolver = {
  Query: {
    list: async (root) => {
      try {
        return await DBOperations.getAll();
      } catch (e) {
        logger.error(e);
        throw new GraphQLError(e);
      }
    },
    get: async (root, {id}) => {
      try {
        return await DBOperations.get(id);
      } catch (e) {
        logger.error(e);
        throw new GraphQLError(e);
      }
    },
  },
  Mutation: {
    create: async (root, { data }) => {
      try {
        return await DBOperations.createData(data);
      } catch (e) {
        logger.error(e);
        throw new GraphQLError(e);
      }
    },
    update: async (root, { id, data }) => {
      try {
        return await DBOperations.updateData(id, data);
      } catch (e) {
        logger.error(e);
        throw new GraphQLError(e);
      }
    },
    delete: async (root, {id}) => {
      try {
        const deleted = await DBOperations.deleteData(id);
        return deleted ? "OK" : "KO";
      } catch (e) {
        logger.error(e);
        throw new GraphQLError(e);
      }
    },
  },
};

module.exports = gqlResolver;
