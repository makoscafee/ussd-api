import fetch from 'node-fetch';
export const getDataStoreFromDHIS2 = async () => {
    const url = `https://test.hisptz.org/dhis/api/dataStore/ussd/idsr`;
    const Authorization = `Basic Ym1ha29uZGE6REhJU0AyMDE4`;

    const response = await fetch(url, { headers: { Authorization }, size: 0, timeout: 0 });
    // parsing
    const data = await response.json();
    return data;
};
