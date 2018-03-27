const r2 = require('r2');
export const getUserFromDHIS2 = phoneNumber => {
    const url = `https://test.hisptz.org/dhis/api/users.json?phoneNumber=${phoneNumber}&paging=false&fields=id,displayName,organisationUnits`;
    const Authorization = `Basic Ym1ha29uZGE6REhJU0AyMDE4`;

    return r2.get(url, { headers: { Authorization } }).json;
};
