const r2 = require('r2');
export const postEventData = data => {
  const url = `https://test.hisptz.org/dhis/api/events`;
  const Authorization = `Basic Y2hpbmdhbG86Q2hpbmdhbG8xMTE5ODc=`;

  return r2.post(url, {
    headers: {
      Authorization
    },
    json: data
  }).json;
};
