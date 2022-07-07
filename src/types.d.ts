// interface of the Post received from the API server and the corresponding type in the client.
/*export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}*/

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
