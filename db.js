const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const connection = require('knex')(config);

export const getUser = (id, testConn) => {
    const conn = testConn || connection;
    return conn('users')
        .where('id', id)
        .first();
};

export const addUserSession = (data, testConn) => {
    const conn = testConn || connection;
    return conn('sessions').insert(data);
};

export const addSessionDatastore = (data, testConn) => {
    const conn = testConn || connection;
    return conn('datastores').insert(data);
};

export const getSessionDatastore = (sessionid, testConn) => {
    const conn = testConn || connection;
    return conn('datastores')
        .where('sessionid', sessionid)
        .first();
};

export const updateUserSession = (sessionid, data, testConn) => {
    const conn = testConn || connection;
    return conn('sessions')
        .where('sessionid', sessionid)
        .update(data);
};

export const getCurrentSession = (sessionid, testConn) => {
    const conn = testConn || connection;
    return conn('sessions')
        .where('sessionid', sessionid)
        .first();
};
