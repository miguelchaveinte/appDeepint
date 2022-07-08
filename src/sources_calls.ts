import { Response } from 'node-fetch';
import { Config } from "./config";
import dotenv from "dotenv";
import fetch from 'node-fetch';
import { ResponseError, ResponseErrorSource, ResultSuccessSource, Source, SourceToAdd} from './types';


dotenv.config(); // Load env variables

// get all sources from a workspace
// @ts-ignore
const getWorkspaceSources = async (idWorkspace:string,page:number=0,limit:number=500)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/sources"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
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
    const respuesta: Source| ResponseError = await response.json();
    return respuesta;
}

// create a new data source into a workspace
// @ts-ignore
const postWorkspaceSource = async (idWorkspace:string,source:SourceToAdd)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/sources"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResultSuccessSource| ResponseError = await response.json();
    return respuesta;
}

// Clones a source
// @ts-ignore
const postSourceClone = async (idWorkspace:string,idSource:string,name:string="") => {
    const url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/clone"), Config.getInstance().deepintURL)).toString();
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
    const respuesta: ResultSuccessSource | ResponseErrorSource | ResponseError = await response.json();  // ResponseErrorSource porque en la API era diferente, pero en realidad devuelve ResponseError
    return respuesta;
}

// Clones a source
// @ts-ignore
/*export const postSourceDerived = async (idWorkspace:string, source:SourceDerived) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/sources/derived"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResultSuccessSource | ResponseErrorSource | ResponseError = await response.json();  // ResponseErrorSource porque en la API era diferente, pero en realidad devuelve ResponseError
    return respuesta;
}*/

//getWorkspaceSources("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",1,50)
/*const prueba:SourceToAdd ={
    "name": "Example source name",
    "description": "Example source description",
    "features": [
      {
        "name": "Field_1",
        "type": "nominal",
        "date_format": "YYYY-MM-DD hh:mm:ss",
        "indexed": true
      }
    ]
  }

  postWorkspaceSource("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",prueba);*/

//postSourceClone("00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2", "1","prueba")

export {getWorkspaceSources,postWorkspaceSource,postSourceClone}