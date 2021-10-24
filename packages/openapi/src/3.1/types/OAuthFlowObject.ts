import { ISpecificationExtension } from "./ISpecificationExtension"

/**
 * Configuration details for a supported OAuth Flow
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauth-flow-object
 */
export interface OAuthFlowObject extends ISpecificationExtension {
    /**
     * **REQUIRED**.
     * The authorization URL to be used for this flow. 
     * This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
     */
    authorizationUrl?: string
    /**
     * **REQUIRED**.
     * The token URL to be used for this flow. 
     * This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
     */
    tokenUrl: string
    /**
     * The URL to be used for obtaining refresh tokens. 
     * This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
     */
    refreshUrl?: string
    /**
     * **REQUIRED**.
     * The available scopes for the OAuth2 security scheme. 
     * A map between the scope name and a short description for it. The map MAY be empty.
     */
    scopes: { [scope: string]: string }
}