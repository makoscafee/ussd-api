const express = require('express');
import { returnAuthenticationResponse } from './helpers/authentication';

const db = require('../db');

const router = express.Router();

const requestHandler = async (req, res) => {
    const { sessionid, telco, USSDRequest, msisdn, USSDType } = req.query;

    const isNewRequest = USSDType === 'NR';
    let response;
    if (isNewRequest) {
        response = await returnAuthenticationResponse(msisdn, sessionid);
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
