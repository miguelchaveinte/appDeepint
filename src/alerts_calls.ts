import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { AlertResult, Alerts, AlertsImport, AlertsInstances, ResponseError, ResultSuccess, ResultSuccessAlert } from './types';

/**
 * Lists the alerts types of a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0). Default value 0
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns List of the alerts items or Error Message
 */
 const getWorkspaceAlerts = async (idWorkspace: string, page: number = 0, limit: number = 500) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts"), Config.getInstance().deepintURL)).toString() + "?" + new URLSearchParams({
        page: page + "",
        limit: limit + "",
    });

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: Alerts | ResponseError = await response.json();
    return respuesta;
}

/**
 * Creates a new type of alert
 * @param idWorkspace id of the workspace
 * @param alert Params of the alert to create
 * @returns Success Message with the id of the new alert or Error Message 
 */
 const postWorkspaceAlerts = async (idWorkspace: string, alert:AlertsImport ) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(alert),
    })
    const respuesta:   ResultSuccessAlert| ResponseError = await response.json();
    return respuesta;
}

/**
 * Fetches information of an alert type             
 * @param idWorkspace   Id of the workspace
 * @param idAlert   Id of the alert to retrieve
 * @returns Alert data result or Error message
 */
 const getWorkspaceAlertById = async (idWorkspace: string, idAlert: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts/" + idAlert), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  AlertResult| ResponseError = await response.json();  
    return respuesta;
}

/**
 * Modifies configuration of an alert type
 * @param idWorkspace Id of the workspace
 * @param idAlert   Id of the alert to modify
 * @param alert Params of the alert to modify
 * @returns Success Message or Error Message 
 */
 const postWorkspaceAlertById = async (idWorkspace: string, idAlert: string,alert:AlertsImport) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts/" + idAlert), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(alert),
    })
    const respuesta:  ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

/**
 * Deletes the alert type
 * @param idWorkspace   Id of the workspace
 * @param idAlert   Id of the alert to delete
 * @returns  Success Message or Error Message 
 */
 const deleteWorkspaceAlertById = async (idWorkspace: string, idAlert: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts/" + idAlert), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

/**
 * Fetches information of an alert type             
 * @param idWorkspace   Id of the workspace
 * @param idAlert   Id of the alert to retrieve
 * @param page Requested page (starts with 0). Default value 0
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns Instances data result of an alert or Error message
 */
 const getWorkspaceAlertInstances = async (idWorkspace: string, idAlert: string,page: number = 0, limit: number = 500) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/alerts/" + idAlert+"/instances"), Config.getInstance().deepintURL)).toString()+ "?" + new URLSearchParams({
        page: page + "",
        limit: limit + "",
    });

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: AlertsInstances | ResponseError = await response.json();  
    return respuesta;
}


export { getWorkspaceAlerts, postWorkspaceAlerts,getWorkspaceAlertById,postWorkspaceAlertById,deleteWorkspaceAlertById,getWorkspaceAlertInstances};