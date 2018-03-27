const r2 = require('r2');
export const postAggregateData = data => {
    const url = `https://test.hisptz.org/dhis/api/dataValueSets`;
    const Authorization = `Basic Ym1ha29uZGE6REhJU0AyMDE4`;

    return r2.post(url, { headers: { Authorization }, json: data }).json;
};
