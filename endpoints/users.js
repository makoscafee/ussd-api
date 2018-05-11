import fetch from 'node-fetch';
export const getUserFromDHIS2 = async phoneNumber => {
    const url = `https://test.hisptz.org/dhis/api/users.json?phoneNumber=${phoneNumber}&paging=false&fields=id,displayName,organisationUnits`;
    const Authorization = `Basic Y2hpbmdhbG86Q2hpbmdhbG8xMTE5ODc=`;

    const response = await fetch(url, {
        headers: {
            Authorization
        }
    });

    const data = await response.json();
    return data;
};