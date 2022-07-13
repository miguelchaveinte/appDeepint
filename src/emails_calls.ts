import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import {Emails, ResponseError, ResultSuccess, ResultSuccessEmail } from './types';


/**
 * Lists the emails to send workspace notifications
 * @param idWorkspace Id of the workspace
 * @returns List of the emails information or Error Message
 */
 const getWorkspaceEmails = async (idWorkspace: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/emails"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: Emails | ResponseError = await response.json();
    return respuesta;
}

/**
 * Adds new email to send notifications
 * @param idWorkspace Id of the workspace
 * @param email Email to add
 * @returns Success Message with id or Error Message
 */
 const postWorkspaceEmails = async (idWorkspace: string,email:{email: string}) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/emails"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(email),
    })
    const respuesta: ResultSuccessEmail | ResponseError = await response.json();
    return respuesta;
}

/**
 * Deletes the email from the list
 * @param idWorkspace   Id of the workspace
 * @param idEmail   Id of the email to delete
 * @returns  Success Message or Error Message 
 */
 const deleteWorkspaceEmailById = async (idWorkspace: string, idEmail: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/emails/" + idEmail), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  ResultSuccess | ResponseError = await response.json();  
    return respuesta;
}

export {getWorkspaceEmails, postWorkspaceEmails,deleteWorkspaceEmailById};