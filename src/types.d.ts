// interface of the Post received from the API server and the corresponding type in the client.
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
