import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Account, AccountProfile, AccProfileImport, ResponseError, ResultSuccess } from './types';

/**
 * Gets the session basic information
 * @returns The user information of the session or Error Message
 */
const getSession = async () => {
    const url = (new URL("who", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  Account| Error = await response.json();
    return respuesta;
}

/**
 * Gets the user's public profile
 * @returns The user basic information of its profile or Error Message
 */
const getProfile = async () => {
    const url = (new URL("profile", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  AccountProfile| Error = await response.json();
    return respuesta;
}

/**
 * Modifies user's profile
 * @param profile The new profile information
 * @returns The user basic information of its profile or Error Message
 */
 const postProfile = async (profile: AccProfileImport) => {
    const url = (new URL("profile", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(profile),
    })
    const respuesta:  ResultSuccess|  ResponseError |Error = await response.json();
    return respuesta;
}

export { getSession,getProfile,postProfile};