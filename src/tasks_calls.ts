import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { ResponseError, ResultSuccess, Task, TaskById } from './types';


/**
 * Get all tasks from a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0). Default value 0
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns  List of data of all tasks or Error Message 
 */
const getWorkspaceTasks = async (idWorkspace:string,page:number=0,limit:number=500)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/tasks"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
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
    const respuesta: Task| ResponseError = await response.json();
    return respuesta;
}


/**
 * Obtains task information
 * @param idWorkspace  Id of the workspace 
 * @param idTask  Id of the task to retrieve
 * @returns The task information object or Error Message
 */
const getWorkspaceTaskById = async (idWorkspace:string,idTask:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/tasks/"+idTask), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: TaskById| ResponseError = await response.json();
    return respuesta;
}

/**
 * Force stops a running task.
 * @param idWorkspace Id of the workspace 
 * @param idTask Id of the task to stop
 * @returns Success Message or Error Message 
 */
const deleteWorkspaceTaskById = async (idWorkspace:string,idTask:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/tasks/"+idTask), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResultSuccess| ResponseError = await response.json();
    return respuesta;
}

export {getWorkspaceTasks,getWorkspaceTaskById,deleteWorkspaceTaskById};