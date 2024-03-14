const logger = require('./logger');

module.exports = (namespace, fn) => {
    return async (data)=> {
        try {
            
            logger.info(`request::${namespace} - ${JSON.stringify(data, null, 2)}`);
            const resp = await fn(data);
            logger.info(`response::${namespace} - ${JSON.stringify(resp, null, 2)}`);
            return resp;
            
        } catch (err) {
            logger.error(`error::${namespace}: ${err}`);
            throw err
        }
    }
};