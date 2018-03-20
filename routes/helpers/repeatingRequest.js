import { getCurrentSession, updateUserSession } from '../../db';
// Deals with curren menu.
export const repeatingRequest = async (sessionid, USSDRequest) => {
    let response;
    const { currentmenu, datastore, retries } = await getCurrentSession(sessionid);
    const menus = JSON.parse(datastore).menus;
    const _currentMenu = menus[currentmenu];
    if (_currentMenu.type === 'auth') {
        if (_currentMenu.number_of_retries && retries >= _currentMenu.number_of_retries) {
            response = `C;${sessionid};${_currentMenu.fail_message}`;
        } else {
            response = await checkAuthKey(sessionid, USSDRequest, _currentMenu, menus, retries);
        }
    } else if (_currentMenu.type === 'options') {
        response = checkOptionsAnswer(sessionid, _currentMenu, USSDRequest, menus);
    } else if (_currentMenu.type === 'period') {
        response = checkPeriodAnswer(sessionid, _currentMenu, USSDRequest, menus);
    }
    return response;
};

const checkAuthKey = async (sessionid, response, currentMenu, menus, retries) => {
    let message;
    const { next_menu, number_of_retries, retry_message } = currentMenu;
    if (response === currentMenu.auth_key) {
        message = await returnNextMenu(sessionid, next_menu, menus);
    } else {
        await updateUserSession(sessionid, { retries: Number(retries) + 1 });
        message = `P;${sessionid};${retry_message}`;
    }

    return message;
};

// Deals with next menu;
const returnNextMenu = async (sessionid, next_menu, menus) => {
    let message;
    await updateUserSession(sessionid, { currentmenu: next_menu, retries: 0 });
    const menu = menus[next_menu];
    if (menu.type === 'options') {
        message = `P;${sessionid};${returnOptions(menu)}`;
    } else if (menu.type === 'period') {
        message = `P;${sessionid};${menu.title}`;
    }
    return message;
};

// Option Answers.
const checkOptionsAnswer = async (sessionid, menu, answer, menus) => {
    const { options } = menu;
    const responses = options.map(option => option.response);
    if (!responses.includes(answer)) {
        return `C;${sessionid};${menu.fail_message || 'You did not enter the correct choice'}`;
    }

    const correctOption = options.filter(option => option.response === answer)[0];
    const { next_menu } = correctOption;
    return await returnNextMenu(sessionid, next_menu, menus);
};

const returnOptions = ({ title, options }) => {
    return [title, ...options.map(({ response, title }) => `${response}. ${title}`)].join('\n');
};

// check Period answer
const checkPeriodAnswer = async (sessionid, menu, answer, menus) => {
    let response;
    const { period_type, maximum_value, next_menu } = menu;
    if (answer > maximum_value) {
        return `C;${sessionid};${menu.fail_message || 'You did not enter the correct choice'}`;
    }

    return await returnNextMenu(sessionid, next_menu, menus);
};
