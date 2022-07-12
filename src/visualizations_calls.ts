import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { ResponseError, ResponseErrorSource, ResultSuccess, ResultSuccessSource, Visualization, VisualizationImport, VisualizationResult } from './types';

/**
 * Lists the visualizations of a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0). Default value 0
 * @param limit Max number of items per page (max 500) Default value 500
 * @returns List of the visualization objects
 */
const getWorkspaceVisualizations = async (idWorkspace:string,page:number=0,limit:number=500)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualizations"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
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
    const respuesta: Visualization| ResponseError = await response.json();
    return respuesta;
}

/**
 * Creates a visualization
 * @param idWorkspace Id of the workspace
 * @param visualization Params for the visualization to create
 * @returns  Success Message with the id of the new visualization or Error Message
 */
const postWorkspaceVisualizations = async (idWorkspace:string,visualization:VisualizationImport)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualizations"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(visualization),
    })
    const respuesta: ResultSuccessSource| ResponseErrorSource | ResponseError = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

/**
 * Gets visualization data
 * @param idWorkspace Id of the workspace
 * @param idVisualization Id of the visualization to retrieve
 * @returns Visualization object containing the visualization information or Error Message
 */
const getWorkspaceVisualizationById = async (idWorkspace:string,idVisualization:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualization/"+idVisualization), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: VisualizationResult| ResponseErrorSource | ResponseError  = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

/**
 * Modifies visualization
 * @param idWorkspace Id of the workspace
 * @param idVisualization Id of the visualization to modify
 * @param visualization Params of visualization to modify
 * @returns Success Message or Error Message
 */
const postWorkspaceVisualizationById = async (idWorkspace:string,idVisualization:string,visualization:VisualizationImport)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualization/"+idVisualization), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(visualization),
    })
    const respuesta: ResultSuccess| ResponseErrorSource | ResponseError  = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

/**
 * Deletes visualization
 * @param idWorkspace Id of the workspace  
 * @param idVisualization  Id of the visualization to delete
 * @returns Success Message or Error Message
 */
const deleteWorkspaceVisualizationById = async (idWorkspace:string,idVisualization:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualization/"+idVisualization), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResultSuccess| ResponseErrorSource | ResponseError  = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

/**
 * Clones visualization
 * @param idWorkspace Id of the workspace
 * @param idVisualization  Id of the visualization to clone
 * @param name name of the visualization 
 * @returns Success Message with the id  of the new visualization or Error Message
 */
const postCloneVisualizationById = async (idWorkspace:string,idVisualization:string,name:{name:string;})=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/visualization/"+idVisualization+"/clone"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(name),
    })
    const respuesta: ResultSuccessSource| ResponseErrorSource | ResponseError  = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

export {getWorkspaceVisualizations,postWorkspaceVisualizations,getWorkspaceVisualizationById,postWorkspaceVisualizationById,deleteWorkspaceVisualizationById,postCloneVisualizationById};