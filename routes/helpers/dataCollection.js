import { getSessionDataValue, updateSessionDataValues, addSessionDatavalues, getCurrentSession, getUser } from '../../db';
import { postAggregateData } from '../../endpoints/dataValueSets';
import { postEventData } from '../../endpoints/eventData';

export const collectData = async (sessionid, _currentMenu, USSDRequest) => {
  const sessionDatavalues = await getSessionDataValue(sessionid);
  const { dataType, category_combo, data_element, program, program_stage } = _currentMenu;
  const dataValue = [
    {
      dataElement: data_element,
      categoryOptionCombo: category_combo,
      value: USSDRequest
    }
  ];
  const data = {
    sessionid,
    programStage: program_stage,
    program,
    datatype: dataType
  };
  if (sessionDatavalues) {
    const oldDataValues = JSON.parse(sessionDatavalues.dataValues);
    const dataValues = [...oldDataValues, ...dataValue];
    return updateSessionDataValues(sessionid, {
      ...data,
      dataValues: JSON.stringify(dataValues)
    });
  }

  return addSessionDatavalues({
    ...data,
    dataValues: JSON.stringify(dataValue)
  });
};

export const submitData = async (sessionid, _currentMenu, USSDRequest, menus) => {
  const sessionDatavalues = await getSessionDataValue(sessionid);
  const { datatype, program, programStage } = sessionDatavalues;
  if (datatype === 'aggregate') {
    return sendAggregateData(sessionid);
  } else if (datatype === 'event') {
    return sendEventData(sessionid, program, programStage);
  }
};

export const collectPeriodData = async (sessionid, obj) => {
  const sessionDatavalues = await getSessionDataValue(sessionid);
  if (sessionDatavalues) {
    return updateSessionDataValues(sessionid, {
      ...sessionDatavalues,
      ...obj
    });
  }
  return addSessionDatavalues({
    sessionid,
    ...obj
  });
};

const sendAggregateData = async sessionid => {
  const sessionDatavalues = await getSessionDataValue(sessionid);
  const sessions = await getCurrentSession(sessionid);
  const { dataValues, year, period } = sessionDatavalues;
  const { orgUnit } = sessions;
  const finalPeriod = `${year}${period}`;
  const dtValues = JSON.parse(dataValues);
  const dtArray = dtValues.map(({ categoryOptionCombo, dataElement, value }) => ({
    categoryOptionCombo,
    dataElement,
    value,
    period: finalPeriod,
    orgUnit
  }));
  const response = await postAggregateData({
    dataValues: dtArray
  });
  return response;
};

const sendEventData = async (sessionid, program, programStage) => {
  const sessionDatavalues = await getSessionDataValue(sessionid);
  const sessions = await getCurrentSession(sessionid);
  const { dataValues } = sessionDatavalues;
  const { orgUnit } = sessions;
  const dtValues = JSON.parse(dataValues);
  const dtArray = dtValues.map(({ dataElement, value }) => ({
    dataElement,
    value
  }));

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; //January is 0!
  const year = today.getFullYear();

  const response = await postEventData({
    program,
    programStage,
    eventDate: `${year}-${month}-${day}`,
    orgUnit,
    status: 'COMPLETED',
    dataValues: dtArray
  });
  return response;
};
