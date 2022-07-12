import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Models, ModelSet,ModelEvaluation, ModelsImport, ModelsResult, ResponseError, ResponseWorkspaceExport, ResultSuccess, ModelData, ModelPredict } from './types';

/**
 * Lists the models of a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0). Default value 0
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns List of the models items or Error Message
 */
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

/**
 * Creates a new artificial intelligence model. 
 * @param idWorkspace id of the workspace
 * @param model Params of the model to create
 * @returns Success Message with the id of the new model or Error Message 
 */
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

/**
 * Gets the information about a model              
 * @param idWorkspace   Id of the workspace
 * @param idModel   Id of the model to retrieve
 * @returns Model data result or Error message
 */
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

/**
 * Modifies the name and description of a model
 * @param idWorkspace Id of the workspace
 * @param idModel   Id of the model to modify
 * @param model Params(name,description) of the model to modify
 * @returns Success Message or Error Message 
 */
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

/**
 * Deletes a model
 * @param idWorkspace   Id of the workspace
 * @param idModel   Id of the model to delete
 * @returns  Success Message or Error Message 
 */
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

/**
 * Gets the evaluation of a model.
 * @param idWorkspace Id of the workspace
 * @param idModel   Id of the   model to retrieve the evaluation
 * @returns 
 */
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


/**
 * Uses a model to predict a value given the inputs.
 * @param idWorkspace Id of the workspace
 * @param idModel   Id of the model to apply to the inputs
 * @param inputs Input values given as JSON array. Example: [0.2, 0.1, -0.5, 0.9]
 * @returns Model output value (It can be numeric (for regressors), boolean or string (for classifiers)) or Error Message
 */
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


/**
 * Uses a model to predict a value given the inputs.
 * @param idWorkspace   Id of the workspace
 * @param idModel       Id of the model to predict the value from the inputs
 * @param data   Array of instances to predict. Max 25 instances in a single request.
 * @returns Array of outputs or Error Message
 */
const postModelBatchPredict = async (idWorkspace: string,idModel: string,data:ModelData) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/batch-predict"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(data),
    })
    const respuesta:  {outputs:Array<number>}| ResponseError | Error = await response.json();
    return respuesta;
}

/**
 * Unidimensional predict. Keep all the input variables with the same value and vary one of them.
 * @param idWorkspace  Id of the workspace
 * @param idModel   Id of the model 
 * @param data Array of input values to provide the model with. You must provide the variable you want to vary, event it is not used, to keep the order of the variables.
 * @returns Array of outputs or Error Message
 */
const postModelPredict1d = async (idWorkspace: string,idModel: string,data:ModelPredict) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/models/" + idModel+"/predict-1d"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(data),
    })
    const respuesta:  {outputs:Array<number>}| ResponseError | Error = await response.json();
    console.log(respuesta)
    return respuesta;
}

export{getWorkspaceModels,postWorkspaceModels,getWorkspaceModelById,postWorkspaceModelById,deleteWorkspaceModelById,getModelEvaluation,getModelPredict,postModelBatchPredict,postModelPredict1d}