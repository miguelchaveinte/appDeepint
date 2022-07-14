# api-Deepint

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) for connect with the [Deep Intelligence's API](https://app.deepint.net/api/v1/).

This module lets you connect the platform [Deep Intelligence](https://deepint.net/),using their functions, to your projects.
It encapsulates by means of functions the different calls to the API in order to obtain the required data from it.

## Install

```bash
$ npm install api-deepint
```

## Usage

#### Functions

The module contains all API functions with a characteristic function name: 'methodAPI'+'groupAsociated'+'groupFunctions'+'informationFunction'. Eg: get+Workspace+Visualization+ById = getWorkspaceVisualizationById(params);.

Here there is a list of functions you can use:

- Authentication
    - postLoginToken
    - postRevokeToken

- Account 
    - getProfile
    - getSession

- Workspaces 
    - getWorkspaces
    - postWorkspaces
    - postWorkspacesImport
    - getWorkspaceById
    - postWorkspaceById
    - deleteWorkspaceById
    - postIframe
    - postWorkspace
    - postWorkspaceClone

- Tasks 
    - getWorkspaceTasks
    - getWorkspaceTaskById
    - deleteWorkspaceTaskById

- Sources 
    - getWorkspaceSources
    - postWorkspaceSource
    - postSourceClone
    - postSourceDerived
    - postSourceExternal
    - postSourceOther
    - getWorkspaceSourceById
    - postWorkspaceSourceById
    - deleteWorkspaceSourceById
    - getConnectionSourceById
    - postConnectionSourceById
    - getAutoUpdateSourceById
    - postAutoUpdateSourceById
    - postTransformFeaturesSourcesById
    - getSourceInstances
    - postSourceInstances
    - deleteSourceInstances
    - postExternalSources

- Models 
    - getWorkspaceModels
    - postWorkspaceModels
    - getWorkspaceModelById
    - postWorkspaceModelById
    - deleteWorkspaceModelById
    - getModelEvaluation
    - getModelPredict
    - postModelBatchPredict
    - postModelPredict1d

- Alerts 
    - getWorkspaceAlerts
    - postWorkspaceAlerts
    - getWorkspaceAlertById
    - postWorkspaceAlertById
    - deleteWorkspaceAlertById
    - getWorkspaceAlertInstances

- Emails 
    - getWorkspaceEmails
    - postWorkspaceEmails
    - deleteWorkspaceEmailById

- Visualizations
    - getWorkspaceVisualizations
    - postWorkspaceVisualizations
    - getWorkspaceVisualizationById
    - postWorkspaceVisualizationById
    - deleteWorkspaceVisualizationById
    - postCloneVisualizationById

- Dashboards 
    - getWorkspaces
    - postWorkspaces
    - postWorkspacesImport
    - getWorkspaceById
    - postWorkspaceById
    - deleteWorkspaceById
    - postIframe
    - postWorkspace
    - postWorkspaceClone


These functions work asynchronously, so they return a promise.

#### Configuration

To configure the module, set the following environment variables:

| Variable Name | Description |
|---|---|
| X_AUTH_TOKEN |Token Authorization to connect to the API | X_AUTH_TOKEN |Token Authorization to connect to the API |
| | X_DEEPINT_ORGANIZATION | Organization Token | |
| DEEPINT_API_URL | Deep Intelligence API URL, default is `https://app.deepint.net/api/v1/` |

For source configuration, set the following variables:

| Variable Name | Description |
|---|---|
| SOURCE_PUB_KEY | Public key of the external source | |
| SOURCE_SECRET_KEY | External source secret key | |


## Development Commands

Module repository for more information: https://github.com/miguelchaveinte/appDeepint 

Start by running `npm install` inside the module folder.
`npm run tsc` to build the module,
`npm run start` to build the module,
`npm run pre` to run it in development mode.

To get the documentation of the module functions: `npx typedoc --out docs` .
