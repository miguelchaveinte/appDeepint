// Configuration Source : https://github.com/deepintdev/deepint-external-source-mongo/blob/master/src/config.ts 

"use strict";

import dotenv from "dotenv";

dotenv.config(); // Load env variables

/**
 * Configuration class
 */
export class Config {

    public static instance: Config;

    public static getInstance() {
        if (Config.instance) {
            return Config.instance;
        }

        Config.instance = new Config();

        return Config.instance;
    }


    public deepintURL: string;
    public X_AUTH_TOKEN: string;
    public X_DEEPINT_ORGANIZATION: string;



    constructor() {

        this.deepintURL = process.env.DEEPINT_API_URL || "https://app.deepint.net/api/v1/";
        this.X_AUTH_TOKEN = process.env.X_AUTH_TOKEN || "";
        this.X_DEEPINT_ORGANIZATION = process.env.X_DEEPINT_ORGANIZATION || "";

    }
}