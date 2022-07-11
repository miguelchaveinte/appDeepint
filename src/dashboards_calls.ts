import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Dashboard, DashboardImport, ResponseError, ResponseErrorSource, ResultSuccessDashboard } from './types';


// @ts-ignore
const getWorkspaceDashboards = async (idWorkspace:string,page:number=0,limit:number=500)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/dashboards"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
        page: page+"",
        limit: limit+"",
    });

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: Dashboard| ResponseError = await response.json();
    return respuesta;
}

// @ts-ignore
const postWorkspaceDashboards = async (idWorkspace:string,dashboard:DashboardImport)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/dashboards"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(dashboard),
    })
    const respuesta: ResultSuccessDashboard| ResponseErrorSource | ResponseError = await response.json();
    return respuesta;
}

//getWorkspaceDashboards("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",1,500)
const prueba: DashboardImport ={
    "name": "Dashboard name",
    "description": "Dashboard description",
    "privacy": "public",
    "shareOpt": "",
    "gaId": "string",
    "restricted": true,
    "configuration": {}
}
postWorkspaceDashboards("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",prueba);
export {getWorkspaceDashboards,postWorkspaceDashboards};