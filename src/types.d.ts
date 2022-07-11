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

type FeatureType= 'numeric' | 'nominal' | 'text' | 'date' | 'logic' | 'unknown';

interface Feature{
    name: string;
    type: FeatureType;
    date_format: string;
    indexed: boolean;
}

interface FeatureExport extends Omit<Feature,"indexed"> {
    index: number;
}

export interface FeatureMapped extends Feature {
    mapped_to: number;
}


interface FeatureSourceResult{
    index: number;
    name: string;
    type: string;
    indexed: boolean;
    date_format: string;
    computed: boolean;
    null_count: number;
    min: number;
    max: number;
    mean: number;
    deviation: number;
}

export type FeatureSourceExternal = Omit<Feature, ("date_format"| "indexed")> 

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


export interface SourceExternal extends Omit<SourceToAdd,"features">{
    url: string;
    features: Array<FeatureSourceExternal>;
}


export type FieldType= 'numeric' | 'nominal' | 'text' | 'date' | 'logic'

export type Fields ={
    name: string;
    type: FieldType;
    dateFormat: string;
}

export type TypeSource= 'file/any' | 'url/any' | 's3' | 'ckan' | 'database/mongo' | 'database/mysql' | 'database/influx' | 'mqtt' 
export type JsonMode= 'single' | 'default' 
export type ParserType= 'csv' | 'json'
export type SortingDirection= 'asc' | 'desc'
export type DatabaseType= 'mysql' | 'pg' | 'oracle' | 'ms'


export interface SourceOther {
    name: string;
    description: string;
    type: TypeSource;
    encrypted: boolean;
    indexed: boolean;
    dyn_enabled: boolean;
    dyn_delay: number;
    dyn_replace:boolean;
    dyn_pk: string;
    dyn_update_mode: boolean;
    file: string;
    file_name: string;
    separator: string;
    quotes: string;
    csv_header: boolean;
    json_fields: Array<string>;
    json_prefix: string;
    json_mode: JsonMode;
    date_format: string;
    url: string;
    parser: ParserType;
    http_headers: string;
    rejectUnauthorized: boolean;
    sdp_enabled: boolean;
    sdp_name: string;
    sdp_dir: SortingDirection;
    database: string;
    user: string;
    password: string;
    table:string;
    query: string;
    sort: string;
    project: string;
    limit: number;
    db: DatabaseType;
    host: string;
    port: number;
    topics: string;
    fields_expected: Array<Fields>;
}

export interface SourceResult {
    id:string;
    created:string;
    last_modified:string;
    last_access: string;
    name:string;
    description:string;
    type: string;
    features: Array<FeatureSourceResult>;
    instances: number;
    size_bytes: number;
}

export interface ResultConnection { url:string;}

export interface ConfigurationSource extends Omit<SourceOther,("name" | "type" | "encrypted" | "indexed" | "dyn_enabled" | "dyn_delay" | "dyn_replace" | "dyn_pk" | "dyn_update_mode" | "file" | "file_name" | "fields_expected")>{
    noheader: boolean;
}

export interface UpdateConfiguration {
    description:string;
    enabled:boolean;
    delay:number;
    replace:boolean;
    updateMode:boolean; 
    pk:string;
    configuration:ConfigurationSource;
}

export interface AutoUpdateConfiguration { updateConfig:UpdateConfiguration; } 

export type ConfigurationSourceResult = Omit<SourceOther,("name" | "description" |"type" | "encrypted" | "indexed" | "file" | "file_name")>

export type TransformFeatures ={
    features: Array<FeatureMapped>;
}

export type Instances ={
    features: Array<FeatureExport>;
    instances: Array<Array<string>>;
}

export interface UpdateDataSource {
    replace: boolean;
    pk: string;
    date_format: string;
    data: Array<Array<string>>;
}

export interface SourceSet {
    name: string;
    description: string;
}