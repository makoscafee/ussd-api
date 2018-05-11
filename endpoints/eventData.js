const r2 = require('r2');
export const postEventData = data => {
    const url = `https://test.hisptz.org/dhis/api/events`;
    const Authorization = `Basic Ym1ha29uZGE6REhJU0AyMDE4`;

    return r2.post(url, {
        headers: {
            Authorization
        },
        json: data
    }).json;
};