import { Iframe, ResponseError, ResponseWorkspace, ResponseWorkspaceExport, ResponseWorkspaceImport, ResultSuccess, ResultSuccessIframe, Workspace, WorkspaceById } from './types';
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

// post a new workspace with the specified name and description
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

// @ts-ignore
const postWorkspaceExport = async (idWorkspace:string) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/export"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResponseWorkspaceExport| ResponseError = await response.json();
    return respuesta;
}

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


//getWorkspaces();
//postWorkspaces("test","descripcion de prueba");
//getWorkspaceById("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2");
//postWorkspaceById("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2","test","descripcion de prueba",false,"secret");
//deleteWorkspaceById("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2");
/*const prueba : Iframe = {
    "type": "dashboard",
    "id": "xxxxx-xxxxx-xxxxx-xxxxx",
    "filters": [
      {
        "source": "xxxxx-xxxxx-xxxxx-xxxxx",
        "root": {
          "type": "anyof",
          "operation": "null",
          "left": 0,
          "right": "string",
          "children": [
          ]
        }
      }
    ]
  }
postIframe("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",prueba)*/
//postWorkspaceExport("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2")
//postWorkspaceClone("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2","test")