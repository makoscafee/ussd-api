const r2 = require('r2');
export const getDataStoreFromDHIS2 = () => {
    const url = `https://test.hisptz.org/dhis/api/dataStore/ussd/idsr`;
    const Authorization = `Basic Ym1ha29uZGE6REhJU0AyMDE4`;

    return r2.get(url, { headers: { Authorization } }).json;
};
