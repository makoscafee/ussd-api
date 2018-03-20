import { getUserFromDHIS2 } from '../../queries/users';
import { getDataStoreFromDHIS2 } from '../../queries/dataStore';
import { addUserSession } from '../../db';
const { generateCode, generateCodes } = require('dhis2-uid');

export const returnAuthenticationResponse = async (mssdin, sessionid) => {
    let response;
    const { users } = await getUserFromDHIS2(mssdin);
    response = `You are not allowed to use this system`;
    if (users) {
        const dataStore = await getDataStoreFromDHIS2();
        const { settings, menus } = dataStore;
        const starting_menu = menus[settings.starting_menu];
        const name = users[0].displayName;
        response = `P;${sessionid};${starting_menu.title}`;
        if (users.length > 1) {
            response = `This phone number is associated with more than one number`;
        } else {
            const session_data = {
                name,
                sessionid,
                currentmenu: starting_menu.id,
                number_of_retries: starting_menu.number_of_retries
            };
            await addUserSession(session_data);
        }
    }
    return response;
};
