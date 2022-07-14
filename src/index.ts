//import * as account from './account_calls'; 
//import * as alerts from './alerts_calls'; 
//import * as authentication from './authentication_calls'; 
//import * as config from './config'; 
//import * as dashboard from './dashboards_calls';
//import * as email from './emails_calls'; 
//import * as models from './models_calls';
//import * as sources from './sources_calls';
//import * as tasks from './tasks_calls';
//import * as visualization from './visualizations_calls';
//import * as workspace from './workspaces_calls';

export {getProfile,getSession} from './account_calls'; 
export { postLoginToken,postRevokeToken } from './authentication_calls';
export { getWorkspaceAlerts, postWorkspaceAlerts,getWorkspaceAlertById,postWorkspaceAlertById,deleteWorkspaceAlertById,getWorkspaceAlertInstances} from './alerts_calls';
export {Config} from './config';
export { getWorkspaceDashboards, postWorkspaceDashboards, getWorkspaceDashboardById, postWorkspaceDashboardById, deleteWorkspaceDashboardById, postDashboardClone } from './dashboards_calls';
export {getWorkspaceEmails, postWorkspaceEmails,deleteWorkspaceEmailById} from './emails_calls';
export{getWorkspaceModels,postWorkspaceModels,getWorkspaceModelById,postWorkspaceModelById,deleteWorkspaceModelById,getModelEvaluation,getModelPredict,postModelBatchPredict,postModelPredict1d} from './models_calls';
export {getWorkspaceSources,postWorkspaceSource,postSourceClone,postSourceDerived,postSourceExternal,postSourceOther,getWorkspaceSourceById,postWorkspaceSourceById,deleteWorkspaceSourceById,getConnectionSourceById
    ,postConnectionSourceById,getAutoUpdateSourceById,postAutoUpdateSourceById,postTransformFeaturesSourcesById,getSourceInstances,postSourceInstances,deleteSourceInstances,postExternalSources} from './sources_calls';
export {getWorkspaceTasks,getWorkspaceTaskById,deleteWorkspaceTaskById} from './tasks_calls';
export {getWorkspaceVisualizations,postWorkspaceVisualizations,getWorkspaceVisualizationById,postWorkspaceVisualizationById,deleteWorkspaceVisualizationById,postCloneVisualizationById} from './visualizations_calls';
export {getWorkspaces,postWorkspaces,postWorkspacesImport,getWorkspaceById,postWorkspaceById,deleteWorkspaceById,postIframe,postWorkspace,postWorkspaceClone} from './workspaces_calls';

//export{account,email, sources, tasks, visualization, workspace,alerts, authentication, config, dashboard, models};