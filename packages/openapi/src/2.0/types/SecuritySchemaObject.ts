import { ScopesObject } from "./ScopesObject";

export interface SecuritySchemeObject{
    /**
     * **Required**.
     * The type of the security scheme. Valid values are "basic","apiKey" or "oauth2".
     */
    type: string,
    /**
     * A short description for security scheme.
     */
    description: string,
    /**
     * **Required**.
     * The name of the header or qurey parameter to be used.
     */
    name: string,
    /**
     * **Required**.
     * The location of the API key. Valid values are "query" or "header".
     */
    in: string,
    /**
     * **Required**.
     * The flow used by the OAuth2 security scheme. 
     * Valid values are "implicit","password","application" or "accessCode".
     */
    flow: string,
    /**
     * **Required**.
     * The authorization URL to be used for this flow. This SHOULD be in the form of a URL.
     */
    authorizationURL: string,
    /**
     * **Required**.
     * The token URL to be used for this flow.
     * This SHOULD be in the form of a URL.
     */
    tokenURL: string,
    /**
     * **Required**.
     * The available scopes for the OAuth2 security scheme.
     */
    scopes: ScopesObject


}