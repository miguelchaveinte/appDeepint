import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Models, ModelSet,ModelEvaluation, ModelsImport, ModelsResult, ResponseError, ResponseWorkspaceExport, ResultSuccess, ModelData, ModelPredict } from './types';

// Lists the models of a workspace
// @ts-ignore
const getWorkspaceModels = async (idWorkspace: string, page: number = 0, limit: number = 500) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models"), Config.getInstance().deepintURL)).toString() + "?" + new URLSearchParams({
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
    const respuesta:  Models| ResponseError = await response.json();
    return respuesta;
}

// Creates a new artificial intelligence model. 
// @ts-ignore
const postWorkspaceModels = async (idWorkspace: string, model:ModelsImport ) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(model),
    })
    const respuesta:  ResponseWorkspaceExport | ResponseError = await response.json();
    return respuesta;
}

// Gets the information about a model
// @ts-ignore
const getWorkspaceModelById = async (idWorkspace: string, idModel: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  ModelsResult| ResponseError = await response.json();  
    return respuesta;
}

// Modifies the name and description of a model
// @ts-ignore
const postWorkspaceModelById = async (idWorkspace: string, idModel: string,model:ModelSet) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(model),
    })
    const respuesta:  ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

// Deletes a model.
// @ts-ignore
const deleteWorkspaceModelById = async (idWorkspace: string, idModel: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel), Config.getInstance().deepintURL)).toString()

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

// Gets the evaluation of a model.
// @ts-ignore
const getModelEvaluation = async (idWorkspace: string,idModel: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/evaluation"), Config.getInstance().deepintURL)).toString() 

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  ModelEvaluation| ResponseError = await response.json();
    return respuesta;
}

// Uses a model to predict a value given the inputs.
// @ts-ignore
const getModelPredict = async (idWorkspace: string,idModel: string,inputs:string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/predict"), Config.getInstance().deepintURL)).toString()+"?"+  new URLSearchParams({
        inputs: inputs,
    });

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  {output:number | string | boolean} | ResponseError | Error = await response.json();
    return respuesta;
}

// Uses a model to predict a value given the inputs.
// @ts-ignore
const postModelBatchPredict = async (idWorkspace: string,idModel: string,data:ModelData) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/batch-predict"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  {outputs:Array<number>}| ResponseError | Error = await response.json();
    return respuesta;
}

// Unidimensional predict. 
// @ts-ignore
const postModelPredict1d = async (idWorkspace: string,idModel: string,data:ModelPredict) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/predict-1d"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta:  {outputs:Array<number>}| ResponseError | Error = await response.json();
    console.log(respuesta)
    return respuesta;
}

export{getWorkspaceModels,postWorkspaceModels,getWorkspaceModelById,postWorkspaceModelById,deleteWorkspaceModelById,getModelEvaluation,getModelPredict,postModelBatchPredict,postModelPredict1d}