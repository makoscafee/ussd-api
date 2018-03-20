import { getUserFromDHIS2 } from '../../queries/users';
import { getDataStoreFromDHIS2 } from '../../queries/dataStore';
import { addUserSession, updateUserSession, addSessionDatastore } from '../../db';
const { generateCode } = require('dhis2-uid');

export const returnAuthenticationResponse = async (mssdin, sessionid) => {
    let response;
    const { users } = await getUserFromDHIS2(mssdin);
    response = `You are not allowed to use this system`;
    if (users) {
        const dataStore = await getDataStoreFromDHIS2();
        const { settings, menus } = dataStore;
        const starting_menu = menus[settings.starting_menu];
        const name = users[0].displayName;
        response = `P;${sessionid};${`Welcome ${name} to eIDSR Reporting -- Enter PIN`}`;
        if (users.length > 1) {
            response = `This phone number is associated with more than one number`;
        } else {
            const id = generateCode();
            const session_data = {
                id,
                name,
                sessionid,
                currentmenu: starting_menu.id,
                retries: 0
            };
            await addUserSession({ ...session_data, datastore: JSON.stringify(dataStore) });
        }
    }
    return response;
};
