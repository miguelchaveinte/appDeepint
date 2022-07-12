import { Iframe, ResponseError, ResponseWorkspace, ResponseWorkspaceImport, ResultSuccess, ResultSuccessIframe, Workspace, WorkspaceById } from './types';
import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';


/**
 * Obtains the list of workspaces
 * @returns List of all workspaces or Error Message
 */
const getWorkspaces = async () => {
    const url = (new URL("workspaces", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
            'x-deepint-organization': Config.getInstance().X_DEEPINT_ORGANIZATION
        }
    })


    const workspaces: Workspace| ResponseError = await response.json();
    return workspaces;
};


/**
 * Creates a new workspace
 * @param name Name of the new workspace
 * @param description Description of the new workspace
 * @returns Success Message with the workspace id of the operation or Error Message 
 */
const postWorkspaces = async (name: string="",description: string="") => {
    const url = (new URL("workspaces", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
            'x-deepint-organization': Config.getInstance().X_DEEPINT_ORGANIZATION
        },
        body: JSON.stringify({
            name : name,
            description : description,
        })
    })


    const respuesta: ResponseWorkspace| ResponseError = await response.json();
    return respuesta;
};


/**
 * Creates a new workspace (mport from ZIP)
 * @param name Name of the new workspace
 * @param description Description of the new workspace
 * @param file ZIP file to upload
 * @returns Success Message with the workspace id and task id of the operation or Error Message 
 */
 const postWorkspacesImport = async (name: string="",description: string="", file: string="") => {
    const url = (new URL("workspaces", Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
            'x-deepint-organization': Config.getInstance().X_DEEPINT_ORGANIZATION
        },
        body: JSON.stringify({
            name : name,
            description : description,
            files : [file]
        })
    })


    const respuesta: ResponseWorkspaceImport| ResponseError = await response.json();
    return respuesta;
};


/**
 * Gets the information of a workspace
 * @param id Id of the workspace
 * @returns The information data of the request workspace
 */
 const getWorkspaceById = async (id: string) => {
    const url = (new URL("workspace/".concat(id), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
        }
    })


    const workspace: WorkspaceById| ResponseError = await response.json();
    return workspace;
};


/**
 * Modifies a workspace name and description.
 * @param id Id of the workspace
 * @param name New name  of the workspace
 * @param description New name of the workspace
 * @param disableIndividualAlerts True if individual email notifications are disabled
 * @param secret Secret for signing JSON web tokens
 * @returns Success Message or Error Message 
 */
 const postWorkspaceById = async (id: string,name: string="",description: string="",disableIndividualAlerts: boolean=false,secret: string="") => {
    const url = (new URL("workspace/".concat(id), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
        },
        body: JSON.stringify({
            name : name,
            description : description,
            disableIndividualAlerts: disableIndividualAlerts,
            secret: secret
        })
    })

    const respuesta: ResultSuccess| ResponseError = await response.json();
    return respuesta;
};


/**
 * Deletes a workspace
 * @param id Id of the workspace
 * @returns Success Message or Error Message 
 */
 const deleteWorkspaceById = async (id: string) => {
    const url = (new URL("workspace/".concat(id), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN, 
        }
    })


    const respuesta: ResultSuccess| ResponseError = await response.json();
    return respuesta;
};

/**
 * Creates iframe token for the workspace. Requires a secret to be set.
 * @param idWorkspace Id of the workspace
 * @param iframe Iframe token to the workspace
 * @returns Success Message with the token and url or Error Message
 */
 const postIframe = async (idWorkspace:string,iframe: Iframe) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/iframe"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(iframe)
    })
    const respuesta: ResultSuccessIframe| ResponseError = await response.json();
    return respuesta;
}

/**
 * Exports a workspace to a ZIP file
 * @param idWorkspace Id of the workspace
 * @returns Success Message with task id of the operation or Error Message 
 */
 const postWorkspace = async (idWorkspace:string) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResponseWorkspace| ResponseError = await response.json();
    return respuesta;
}

/**
 * Clones a workspace
 * @param idWorkspace Id of the workspace
 * @param name Name of the new workspace
 * @returns Success Message with the workspace id and task id of the operation or Error Message 
 */
 const postWorkspaceClone = async (idWorkspace:string,name:string="") => {
    const url = (new URL("workspace/".concat(idWorkspace+"/clone"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify({
            name:name
        })
    })
    const respuesta: ResponseWorkspaceImport| ResponseError = await response.json();
    return respuesta;
}

export {getWorkspaces,postWorkspaces,postWorkspacesImport,getWorkspaceById,postWorkspaceById,deleteWorkspaceById,postIframe,postWorkspace,postWorkspaceClone}; 