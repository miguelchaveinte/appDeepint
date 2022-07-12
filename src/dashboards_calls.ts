import { Response } from 'node-fetch';
import { Config } from "./config";
import fetch from 'node-fetch';
import { Dashboard, DashboardImport, DashboarResult, ResponseError, ResponseErrorSource, ResultSuccess, ResultSuccessDashboard, deleteVisualization } from './types';

/**
 * Lists the dashboards of a workspace
 * @param idWorkspace Id of the workspace
 * @param page Requested page (starts with 0). Default value 0 
 * @param limit Max number of items per page (max 500). Default value 500
 * @returns List of the dashboard items or Error Message
 */
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

/**
 * Creates new dashboard
 * @param idWorkspace Id of the workspace
 * @param dashboard Params for the dashboard to create
 * @returns Success Message with the id of the new dashboard or Error Message
 */
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

/**
 * Gets dashboard data
 * @param idWorkspace Id of the workspace
 * @param idDashboard Id of the dashboard to retrieve
 * @returns Dashboard data result or Error Message
 */
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

/**
 * Modifies dashboard
 * @param idWorkspace Id of the workspace 
 * @param idDashboard Id of the dashboard
 * @param dashboard Params for the dashboard to modify
 * @returns Success Message or Error Message
 */
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

/**
 * Deletes dashboard
 * @param idWorkspace Id of the workspace in which the dashboard is located
 * @param idDashboard Id of the dashboard to delete
 * @param deleteVis yes or no to delete all asociated visualizations
 * @returns Success Message or Error Message
 */
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

/**
 * Clones a dashboard
 * @param idWorkspace Id of the workspace
 * @param idDashboard Id of the dashboard
 * @param name Name of the dashboard
 * @returns Success Message with the new dashboard id or Error Message
 */
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
    return respuesta;
}

export { getWorkspaceDashboards, postWorkspaceDashboards, getWorkspaceDashboardById, postWorkspaceDashboardById, deleteWorkspaceDashboardById, postDashboardClone };