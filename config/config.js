
module.exports = {
    httpPort: getConf('HTTP_PORT', 8000),
}

function getConf(name, def) {
    if (process.env[name]) {
        return process.env[name];
    }
    if (def === null) {
        throw new Error(`config ${name} is required`)
    }
    return def;
}