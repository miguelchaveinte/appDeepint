import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { ResponseError, ResponseErrorSource, ResultSuccess, ResultSuccessSource, Visualization, VisualizationImport, VisualizationResult } from './types';

// Lists the visualizations of a workspace
// @ts-ignore
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

// Creates a visualization
// @ts-ignore
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

// Gets visualization data
// @ts-ignore
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

// Modifies visualization
// @ts-ignore
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

// Deletes visualization
// @ts-ignore
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

// Clones visualization
// @ts-ignore
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