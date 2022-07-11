import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Dashboard, DashboardImport, DashboarResult, ResponseError, ResponseErrorSource, ResultSuccess, ResultSuccessDashboard, deleteVisualization } from './types';


// @ts-ignore
const getWorkspaceDashboards = async (idWorkspace: string, page: number = 0, limit: number = 500) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboards"), Config.getInstance().deepintURL)).toString() + "?" + new URLSearchParams({
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
    const respuesta: Dashboard | ResponseError = await response.json();
    return respuesta;
}

// @ts-ignore
const postWorkspaceDashboards = async (idWorkspace: string, dashboard: DashboardImport) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboards"), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(dashboard),
    })
    const respuesta: ResultSuccessDashboard | ResponseErrorSource | ResponseError = await response.json();
    return respuesta;
}

// @ts-ignore
const getWorkspaceDashboardById = async (idWorkspace: string, idDashboard: string) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboard/" + idDashboard), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: DashboarResult | ResponseErrorSource | ResponseError = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

// @ts-ignore
const postWorkspaceDashboardById = async (idWorkspace: string, idDashboard: string, dashboard: DashboardImport) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboard/" + idDashboard), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(dashboard),
    })
    const respuesta: ResultSuccess | ResponseErrorSource | ResponseError = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

// @ts-ignore
const deleteWorkspaceDashboardById = async (idWorkspace: string, idDashboard: string, deleteVis: deleteVisualization) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboard/" + idDashboard), Config.getInstance().deepintURL)).toString() + "?" + new URLSearchParams({
        delete_visualization: deleteVis + "",
    });

    const response: Response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        }
    })
    const respuesta: ResultSuccess | ResponseErrorSource | ResponseError = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    return respuesta;
}

// @ts-ignore
const postDashboardClone = async (idWorkspace: string, idDashboard: string, name: { name: string }) => {
    let url = (new URL("workspace/".concat(idWorkspace + "/dashboard/" + idDashboard), Config.getInstance().deepintURL)).toString()

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': Config.getInstance().X_AUTH_TOKEN
        },
        body: JSON.stringify(name),
    })
    const respuesta: ResultSuccessDashboard | ResponseErrorSource | ResponseError = await response.json();  // ResponseError devuelve aunque en la documentación de la API dice que es un ResponseErrorSource
    console.log(respuesta);
    return respuesta;
}

export { getWorkspaceDashboards, postWorkspaceDashboards, getWorkspaceDashboardById, postWorkspaceDashboardById, deleteWorkspaceDashboardById, postDashboardClone };