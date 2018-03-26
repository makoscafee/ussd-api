import { getSessionDataValue, updateSessionDataValues, addSessionDatavalues } from '../../db';
export const collectData = async (sessionid, _currentMenu, USSDRequest) => {
    const sessionDatavalues = await getSessionDataValue(sessionid);
    const { dataType, category_combo, data_element } = _currentMenu;
    const dataValue = [{ dataElement: data_element, value: USSDRequest }];
    const data = { sessionid, datatype: dataType };
    if (sessionDatavalues) {
        const oldDataValues = JSON.parse(sessionDatavalues.dataValues);
        const dataValues = [...oldDataValues, ...dataValue];
        return updateSessionDataValues(sessionid, { ...data, dataValues: JSON.stringify(dataValues) });
    }

    return addSessionDatavalues({ ...data, dataValues: JSON.stringify(dataValue) });
};

export const submitData = (sessionid, _currentMenu, USSDRequest, menus) => {};

export const collectPeriodData = async (sessionid, obj) => {
    const sessionDatavalues = await getSessionDataValue(sessionid);
    if (sessionDatavalues) {
        return updateSessionDataValues(sessionid, { ...sessionDatavalues, ...obj });
    }
    return addSessionDatavalues({ sessionid, ...obj });
};
