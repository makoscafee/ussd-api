import { getUserFromDHIS2 } from '../../queries/users';

export const returnAuthenticationResponse = async mssdin => {
    let response;
    const { users } = await getUserFromDHIS2(mssdin);
    response = `This user is not in the system`;
    if (users) {
        response = `Welcome to the ids System ${users[0].displayName}`;
        if (users.length > 1) {
            response = `This phone number is associated with more than one number`;
        }
    }
    return response;
};
