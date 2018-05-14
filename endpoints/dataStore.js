const fetch = require('make-fetch-happen').defaults({
  cacheManager: '../' // path where cache will be written (and read)
});
export const getDataStoreFromDHIS2 = async () => {
  const url = `https://test.hisptz.org/dhis/api/dataStore/ussd/idsr`;
  const Authorization = `Basic Y2hpbmdhbG86Q2hpbmdhbG8xMTE5ODc=`;

  const response = await fetch(url, { headers: { Authorization }, size: 0, timeout: 0 });
  // parsing
  const data = await response.json();
  return data;
};
