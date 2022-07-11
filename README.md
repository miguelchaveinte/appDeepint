# appDeepint

Mini-proyecto para hacer llamadas fetch a la API de [appDeepint](https://app.deepint.net/api/v1/).

## Commandos

Empiece ejecutando `npm install` dentro de la carpeta del proyecto.
`npm run tsc` para contruir el proyecto,
`npm run start` para contruir el proyecto,
`npm run pre` para correrlo en modo desarrollo.

## Configuration

Para llevar a cabo la configuración del módulo, establezca las siguientes variables de entorno:

| Variable Name | Description |
|---|---|
| X_AUTH_TOKEN |Token Autorización para conectase a la API |
| X_DEEPINT_ORGANIZATION | Token Organización |
| DEEPINT_API_URL | Deep Intelligence API URL, por defecto es `https://app.deepint.net/api/v1/` |

Para configuración de la fuente, establezca las siguientes variables:

| Variable Name | Description |
|---|---|
| SOURCE_PUB_KEY | Clave pública de la fuente externa |
| SOURCE_SECRET_KEY | Clave secreta de la fuente externa |