//TYPES FOR WORKSPACE CALLS
export interface Filters {
    source: string;
    root: QueryTree;
}

//Source: https://github.com/deepintdev/deepint-external-source-mongo/blob/master/src/utils/deepint-sources.ts
export interface QueryTree {
    type: string;
    operation: string;
    left: number;
    right: string;
    children: QueryTree[];
}

export type Iframe = {
    type: string;
    id: string;
    filters: Array<Filters>;
}

export type Workspace = {
    id: string;
    name: string;
    description: string;
    created: string;
    last_modified: string;
    last_access: string;
    sources_count: number;
    dashboards_count: number;
    visualizations_count: number;
    models_count: number;
    size_bytes: number;
}

export type WorkspaceById = Workspace & {
    disableIndividualAlerts: boolean;
    secret: string;
}

export type ResponseWorkspace ={
    result: string; 
    workspace_id: string;
}

export type ResponseWorkspaceImport = ResponseWorkspace & {task_id: string}
export type ResponseWorkspaceExport = Omit<ResponseWorkspaceImport, "workspace_id">

export type ResponseError = {
    code: string; // es un enum de errors pero como me viene por la api tampoco me interesa hacerlo enum aqui ya que siempre me va a venir un string válido
    message: string;
}

export type ResponseErrorSource = ResponseError & {result:string}

export type ResultSuccess = {result: string;}

export type ResultSuccessIframe = ResultSuccess & {
    token: string;
    url: string;
}



// TYPES FOR TASKS CALLS 

export interface Item {
    id: string;
    user_id: string;
    user_name: string;
    created: string;
    status: string;
    duration: number;
    name: string;
    description: string;
}

export type Task = {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<Item>;
}

export type TaskById = Item & {
    subtask: string;
    progress: number;
    result: string;
    result_type: string;
    error_description: string;
}


// TYPES FOR SOURCES CALLS

type ItemSourceInterface = Item & {
    last_modified: string;
    last_access: string;
    type: string;
    features: number;   
    instances: number;
    size_bytes: number;
}
export type ItemSource = Omit<ItemSourceInterface, ("user_id"| "user_name"|"status"|"duration")> 

export interface Source extends Omit<Task,"items"> {
    items: Array<ItemSource>;
}

interface Feature{
    name: string;
    type: string;
    date_format: string;
    indexed: boolean;
}

export type SourceToAdd = {
    name: string;
    description: string;
    features: Array<Feature>;
}

export type ResultSuccessSource = ResultSuccess & {source_id: string;}

export interface SourceDerived extends Omit<SourceToAdd,"features"> {
    derived_type: string;
    origin: string;
    origin_b: string;
    query: QueryTree;
    features: string;
    field_a: number;
    field_b: number;
}