import { getSessionDataValue, updateSessionDataValues, addSessionDatavalues, getUser } from '../../db';
import { postAggregateData } from '../../queries/dataValueSets';

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

export const submitData = async (sessionid, _currentMenu, USSDRequest, menus) => {
    const sessionDatavalues = await getSessionDataValue(sessionid);
    const { datatype } = sessionDatavalues;
    if (datatype === 'aggregate') {
        return sendAggregateData(sessionDatavalues);
    }
};

export const collectPeriodData = async (sessionid, obj) => {
    const sessionDatavalues = await getSessionDataValue(sessionid);
    if (sessionDatavalues) {
        return updateSessionDataValues(sessionid, { ...sessionDatavalues, ...obj });
    }
    return addSessionDatavalues({ sessionid, ...obj });
};

const sendAggregateData = async ({ dataValues, year, period, orgUnit }) => {
    const finalPeriod = `${year}${period}`;
    const dtValues = JSON.parse(dataValues);
    const dtArray = dtValues.map(value => ({ ...value, period: finalPeriod, orgUnit }));
    return { dataValues: dtArray };
};
