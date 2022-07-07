import { Workspace } from './types';
import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import dotenv from "dotenv";

dotenv.config(); // Load env variables

// getting all posts using fetch and parsing them into an array of Post objects
// @ts-ignore
const getWorkspaces = async () => {
    const response: Response = await fetch('https://app.deepint.net/api/v1/workspaces', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': process.env.X_AUTH_TOKEN!, // El ! indica que no es nullable - crear clase config para esto
            'x-deepint-organization': process.env.X_DEEPINT_ORGANIZATION!
        }
    })


    const workspaces: Workspace = await response.json();
    console.log(workspaces)
};

// getting all posts using fetch and parsing them into an array of Post objects
// @ts-ignore
const postWorkspaces = async (name: string="",description: string="") => {
    const response: Response = await fetch('https://app.deepint.net/api/v1/workspaces', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': process.env.X_AUTH_TOKEN!, // El ! indica que no es nullable - crear clase config para esto
            'x-deepint-organization': process.env.X_DEEPINT_ORGANIZATION!
        },
        body: JSON.stringify({
            name : name,
            description : description,
        })
    })


    const respuesta: Workspace = await response.json();
    console.log(respuesta)
};

//getWorkspaces();
postWorkspaces("test","descripcion de prueba");