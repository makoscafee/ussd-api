const express = require('express');
import { getDataStoreFromDHIS2 } from '../queries/dataStore';
import { returnAuthenticationResponse } from './helpers/authentication';

const db = require('../db');

const router = express.Router();

const requestHandler = async (req, res) => {
    const { sessionid, telco, USSDRequest, msisdn, USSDType } = req.query;

    const isNewRequest = USSDType === 'NR';
    const dataStore = await getDataStoreFromDHIS2();
    let response;
    if (isNewRequest) {
        response = await returnAuthenticationResponse(msisdn);
    }
    res.send(response);
};

router.get('/', requestHandler);

module.exports = router;

// try {
//     response = await db.getUsers();
// } catch (err) {
//     res.status(500).send('DATABASE ERROR: ' + err.message);
// }
