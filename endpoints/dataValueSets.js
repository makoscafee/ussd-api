const r2 = require('r2');
export const postAggregateData = data => {
  const url = `http://41.217.202.50/dhis/api/dataValueSets`;
  const Authorization = `Basic Y2hpbmdhbG86Q2hpbmdhbG8xMTE5ODc=`;

  return r2.post(url, { headers: { Authorization }, json: data }).json;
};
