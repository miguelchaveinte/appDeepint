"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load env variables
// getting all posts using fetch and parsing them into an array of Post objects
// @ts-ignore
const getWorkspaces = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)('https://app.deepint.net/api/v1/workspaces', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': process.env.X_AUTH_TOKEN,
            'x-deepint-organization': process.env.X_DEEPINT_ORGANIZATION
        }
    });
    const workspaces = yield response.json();
    console.log(workspaces);
});
// getting all posts using fetch and parsing them into an array of Post objects
// @ts-ignore
const postWorkspaces = (name = "", description = "") => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)('https://app.deepint.net/api/v1/workspaces', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-auth-token': process.env.X_AUTH_TOKEN,
            'x-deepint-organization': process.env.X_DEEPINT_ORGANIZATION
        },
        body: JSON.stringify({
            name: name,
            description: description,
        })
    });
    const respuesta = yield response.json();
    console.log(respuesta);
});
//getWorkspaces();
postWorkspaces("test", "descripcion de prueba");
