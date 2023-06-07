const { parse, print, getIntrospectionQuery } = require('graphql');
const logger = require('../../utils/logger');

const introspectionQuery = print(parse(getIntrospectionQuery()));

const logPlugin = {
  requestDidStart(initialRequestContext) {
    let queryName = '';
    if (initialRequestContext.request.query !== introspectionQuery) {
      const obj = parse(initialRequestContext.request.query);
      queryName = obj.definitions[0]?.selectionSet.selections[0]?.name?.value;
    }

    return {
      didResolveOperation({ operationName }) {
        if (operationName !== 'IntrospectionQuery') {
          logger.debug(`Start ${operationName || queryName}`);
        }
      },
      didEncounterErrors({ request, context, errors }) {
        try {
          const reqError = JSON.stringify(request);
          const reqErrorUser = context?.user ? context.user.id : 'anonym';
          let errorLogTxt = ` request has encountered errors, made by ${reqErrorUser}: ${reqError}`;
          if (errors) {
            errors.forEach((err) => {
              errorLogTxt += `response error: ${JSON.stringify(err)}`;
            });
          }
          logger.error(`${errorLogTxt}`);
        } catch (e) {
            logger.error(e);
        }
      },
      willSendResponse({ operationName }) {
        if (operationName !== 'IntrospectionQuery') {
            logger.debug(`End ${operationName || queryName}`);
        }
      },
    };
  },
};

module.exports = logPlugin;
