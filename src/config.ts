// Configuration Source : https://github.com/deepintdev/deepint-external-source-mongo/blob/master/src/config.ts 

"use strict";

import 'dotenv/config';

/**
 * Configuration class
 */
export class Config {

    public static instance: Config;

    /**
     * Return a configuration variable
     * @returns the instance of the configuration requested
     */
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

    public pubKey: string;
    public secretKey: string;



    constructor() {

        this.deepintURL = process.env.DEEPINT_API_URL || "https://app.deepint.net/api/v1/";
        this.X_AUTH_TOKEN = process.env.X_AUTH_TOKEN || "";
        this.X_DEEPINT_ORGANIZATION = process.env.X_DEEPINT_ORGANIZATION || "";

        this.pubKey = process.env.SOURCE_PUB_KEY || "";
        this.secretKey = process.env.SOURCE_SECRET_KEY || "";

    }
}