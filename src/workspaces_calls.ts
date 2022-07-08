import { Iframe, ResponseError, ResponseWorkspace, ResponseWorkspaceImport, ResultSuccess, ResultSuccessIframe, Workspace, WorkspaceById } from './types';
import { Response } from 'node-fetch';
import { Config } from "./config";
import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config(); // Load env variables

// getting all posts using fetch and parsing them into an array of Post objects
// @ts-ignore
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


// post a new workspace with the specified name and description
// @ts-ignore
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

// post a new workspace with the specified name and description and (mport from ZIP)
// @ts-ignore
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

// get the infomation of a workspace by the id
// @ts-ignore
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

// modifies a workspace name and description.
// @ts-ignore
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

// delete a workspace by the id 
// @ts-ignore
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

// create iframe token for the workspace
// @ts-ignore
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

// s a workspace to a ZIP file
// @ts-ignore
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

// Clones a workspace
// @ts-ignore
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