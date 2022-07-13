import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { BearerToken, ResponseError, ResponseErrorSource, ResultSuccess, RevokeToken } from './types';

/**
 * Obtains an authentication token given a bearer token. You can obtain a bearer token when the user gives authorization to your application to access their account.
 * @param token Bearer token to obtein the authentication token
 * @returns Success message or Error message
 */
const postLoginToken = async (token:BearerToken) => {
    let url = 'https://app.deepint.net/api/oauth/login'

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify(token),
    })
    const respuesta:  ResultSuccess| ResponseError | ResponseErrorSource = await response.json();
    return respuesta;
}

/**
 * Revokes an authentication token.
 * @param token Authentication token to revoke
 * @returns Success message or Error message
 */
const postRevokeToken = async (token:RevokeToken) => {
    let url = 'https://app.deepint.net/api/oauth/revoke'

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify(token),
    })
    const respuesta:  ResultSuccess| ResponseError | ResponseErrorSource  = await response.json();
    return respuesta;
}

export { postLoginToken,postRevokeToken };
