const logger = require('./logger');

module.exports = (namespace, fn) => {
    return async (req, res, next)=> {
        try {
            const resp = await fn(req, res, next);
            return resp;
            
        } catch (err) {
            logger.error(`error::${namespace}: ${err}`);
            res.json({
                message: 'failed',
                data: {error: err}
            });
        }
    }
};