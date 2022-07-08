import { Response } from 'node-fetch';
import { Config } from "./config";
import dotenv from "dotenv";
import fetch from 'node-fetch';
import { ResponseError, ResultSuccess, Task, TaskById } from './types';

dotenv.config(); // Load env variables

// get all tasks from a workspace
// @ts-ignore
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

// get a task through its id from a workspace 
// @ts-ignore
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

// delete a task through its id from a workspace 
// @ts-ignore
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
