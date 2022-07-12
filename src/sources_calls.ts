import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { AutoUpdateConfiguration, ConfigurationSourceResult, Instances, ResponseError, ResponseErrorSource, ResponseWorkspaceExport, ResultConnection, ResultSuccess, ResultSuccessSource, Source, SourceDerived, SourceExternal, SourceOther, SourceResult, SourceSet, SourceToAdd, TransformFeatures, UpdateDataSource} from './types';


/**
 * get all sources from a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0) .Default value 0
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns List of data of all sources or Error Message 
 */
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

/**
 * Create a new data source into a workspace
 * @param idWorkspace   Id of the workspace
 * @param source Params of the source object to create
 * @returns Success Message with the id of the new source or Error Message 
 */
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

/**
 * Clones a source
 * @param idWorkspace   Id of the workspace
 * @param idSource Id of the source to clone
 * @param name Name of the new cloned source
 * @returns Success Message with the id of the new source or Error Message 
 */
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

/**
 * Creates a derived source
 * @param idWorkspace Id of the workspace
 * @param source Params of the source object to create
 * @returns Success Message with the task id of the operation or Error Message 
 */
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

/**
 * Creates a external source
 * @param idWorkspace   Id of the workspace
 * @param source  Params of the external source to create
 * @returns Success Message with the new source id or Error Message 
 */
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


/**
 * Creates other type of source
 * @param idWorkspace Id of the workspace
 * @param source Params of the source object to create
 * @returns Success Message with the new source id or Error Message
 */
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


/**
 * Obtains information about a source
 * @param idWorkspace Id of the workspace
 * @param idSource  Id of the source to retrieve information about
 * @returns Infomation and data about the request source or Error Message
 */
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

/**
 * Sets the name and description of the source
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the  source to set the name and description
 * @param source Params(name and description) of the source object to set
 * @returns Success Message or Error Message
 */
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

/**
 * Deletes the data source
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source to be deleted
 * @returns  Success Message or Error Message
 */
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

/**
 * Gets external source connection URL
 * @param idWorkspace Id of the workspace
 * @param idSource  Id of the source to connect to the external source
 * @returns External connection URL or Error Message
 */
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

/**
 * Sets the Connection for a external source
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source to connect to the external source
 * @param connection External connection URL
 * @returns Success Message or Error Message
 */
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

/**
 * Gets source auto update configuration
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source to get the auto update configuration
 * @returns The auto update configuration object or Error Message
 */
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


/**
 * Sets the auto update configuration
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source to be updated with the new configuration
 * @param configuration The auto update configuration
 * @returns Success Message or Error Message
 */
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

/**
 * Transforms the source features.
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source 
 * @param features Params of the features to update on the source
 * @returns Success Message with the task id of the operation or Error Message 
 */
const postTransformFeaturesSourcesById = async (idWorkspace:string,idSource:string, features:TransformFeatures)=> {
    let url = (new URL("workspace/".concat(idWorkspace+"/source/"+idSource+"/features"), Config.getInstance().deepintURL)).toString();

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

/**
 * Queries the instances of a data source
 * @param idWorkspace  Id of the workspace
 * @param idSource Id of the source 
 * @param select List of features (indexes to fetch). Do not set to get all the features.
 * @param where Conditions to match (filter), as a JSON of QueryTree 
 * @param order_by Sorting options. Must be the index of the feature to sort by and 'asc' or 'desc'. Example : 2,desc
 * @param offset Number of instances to skip (if you orderred them)
 * @param limit Max number of instances to fetch. Do not set or set to -1 to get all the instances.
 * @returns Object with the features and instances of the source or Error Message
 */
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

/**
 * Updates a data source.
 * @param idWorkspace   Id of the workspace
 * @param idSource  Id of the source
 * @param update Params of the source to update
 * @returns Success Message with the task id of the operation or Error Message 
 */
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


/**
 * Updates a data source (delete) operation
 * @param idWorkspace   Id of the workspace
 * @param idSource      Id of the source
 * @param where Conditions to match (filter), as a JSON of QueryTree
 * @returns Success Message with the task id of the operation or Error Message 
 */
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

/**
 * Updates external source, in order to generate alerts al clear cache. You can include up to 100 instances to analize in the body.
 * @param source Data to provide, as a matrix
 * @returns Success Message or Error Message (Example: Busy. You will receive this response by trying to update with multiple requests in parallel.)
 */
const postExternalSources = async (source: Array<Array<string|number|boolean>>)=> {
    let url = (new URL("external/source/update", Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {  
            'Accept': 'application/json',
            'x-public-key': Config.getInstance().pubKey,
            'x-secret-key': Config.getInstance().secretKey,
        },
        body: JSON.stringify(source),
    })
    const respuesta: ResultSuccess| string | Error = await response.json();  // string -> Busy. Error code 429:  multiple requests in parallel.
    return respuesta;
}

export {getWorkspaceSources,postWorkspaceSource,postSourceClone,postSourceDerived,postSourceExternal,postSourceOther,getWorkspaceSourceById,postWorkspaceSourceById,deleteWorkspaceSourceById,getConnectionSourceById
,postConnectionSourceById,getAutoUpdateSourceById,postAutoUpdateSourceById,postTransformFeaturesSourcesById,getSourceInstances,postSourceInstances,deleteSourceInstances,postExternalSources};