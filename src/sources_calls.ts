import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { AutoUpdateConfiguration, ConfigurationSourceResult, Instances, ResponseError, ResponseErrorSource, ResponseWorkspaceExport, ResultConnection, ResultSuccess, ResultSuccessSource, Source, SourceDerived, SourceExternal, SourceOther, SourceResult, SourceSet, SourceToAdd, TransformFeatures, UpdateDataSource} from './types';


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
    const respuesta: Source| ResponseError = await response.json();  // ARRAY DE SOURCES???
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

// Creates a derived source
// @ts-ignore
const postSourceDerived = async (idWorkspace:string, source:SourceDerived) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/sources/derived"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResponseWorkspaceExport | ResponseError = await response.json();  
    return respuesta;
}

// Creates a external source
// @ts-ignore
const postSourceExternal = async (idWorkspace:string, source:SourceExternal) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/sources/external"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResultSuccessSource | ResponseError = await response.json();  
    return respuesta;
}

// Creates other type of source
// @ts-ignore
const postSourceOther = async (idWorkspace:string, source:SourceOther) => {
    const url = (new URL("workspace/".concat(idWorkspace+"/sources/other"), Config.getInstance().deepintURL)).toString();
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResultSuccessSource | ResponseError = await response.json();  
    return respuesta;
}

// Obtains information about a source
// @ts-ignore
const getWorkspaceSourceById = async (idWorkspace:string,idSource:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: SourceResult| ResponseError = await response.json(); 
    return respuesta;
}

// Sets the name and description of the source
// @ts-ignore
const postWorkspaceSourceById = async (idWorkspace:string,idSource:string,source:SourceSet)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(source)
    })
    const respuesta: ResultSuccess| ResponseError = await response.json(); 
    return respuesta;
}

// Deletes the data source
// @ts-ignore
const deleteWorkspaceSourceById = async (idWorkspace:string,idSource:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

// Gets external source connection URL
// @ts-ignore
const getConnectionSourceById = async (idWorkspace:string,idSource:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/connection"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResultConnection| ResponseError = await response.json();  
    return respuesta;
}

// Sets the Connection for a external source
// @ts-ignore
const postConnectionSourceById = async (idWorkspace:string,idSource:string,connection: ResultConnection)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/connection"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(connection)
    })
    const respuesta: ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

//Gets source auto update configuration
// @ts-ignore
const getAutoUpdateSourceById = async (idWorkspace:string,idSource:string)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/autoupdate"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: AutoUpdateConfiguration| ResponseError = await response.json();  
    return respuesta;
}

// Sets the auto update configuration
// @ts-ignore
const postAutoUpdateSourceById = async (idWorkspace:string,idSource:string, configuration:ConfigurationSourceResult)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/autoupdate"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(configuration)
    })
    const respuesta: ResultSuccess| ResponseError = await response.json();  
    return respuesta;
}

// Transforms the source features.
// @ts-ignore
const postTransformFeaturesSourcesById = async (idWorkspace:string,idSource:string, features:TransformFeatures)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/autoupdate"), Config.getInstance().deepintURL)).toString();

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(features)
    })
    const respuesta: ResponseWorkspaceExport | ResponseError = await response.json(); 
    return respuesta;
}

// Queries the instances of a data source
// @ts-ignore
const getSourceInstances = async (idWorkspace:string,idSource:string,select:string="",where:string="",order_by:string="",offset:number=0,limit:number=-1)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/instances"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
        select:select,
        where:where,
        order_by:order_by,
        offset:offset+"",
        limit:limit+""
    });

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: Instances| ResponseError = await response.json();
    return respuesta;
}

// Updates a data source.
// @ts-ignore
const postSourceInstances = async (idWorkspace:string,idSource:string,update: UpdateDataSource)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/instances"), Config.getInstance().deepintURL)).toString()
    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(update)
    })
    const respuesta: ResponseWorkspaceExport| ResponseError = await response.json();
    return respuesta;
}

// Updates a data source.
// @ts-ignore
const deleteSourceInstances = async (idWorkspace:string,idSource:string,where: string="")=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/instances"), Config.getInstance().deepintURL)).toString()+"?"+ new URLSearchParams({
        where:where,
    });

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {  
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResponseWorkspaceExport| ResponseError = await response.json();
    return respuesta;
}

// Updates external source
// @ts-ignore
const postExternalSources = async (source: Array<Array<string|number|boolean>>)=> {
    let url = (new URL("external/source/update", Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-public-key': Config.getInstance().pubKey,
            'x-secret-key': Config.getInstance().secretKey,
        }
    })
    const respuesta: ResultSuccess| string = await response.json();  // string -> Busy. Error code 429:  multiple requests in parallel.
    return respuesta;
}

export {getWorkspaceSources,postWorkspaceSource,postSourceClone,postSourceDerived,postSourceExternal,postSourceOther,getWorkspaceSourceById,postWorkspaceSourceById,deleteWorkspaceSourceById,getConnectionSourceById
,postConnectionSourceById,getAutoUpdateSourceById,postTransformFeaturesSourcesById,getSourceInstances,postSourceInstances,deleteSourceInstances,postExternalSources};