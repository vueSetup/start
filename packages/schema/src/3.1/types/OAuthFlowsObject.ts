import { ISpecificationExtension } from "./ISpecificationExtension"
import { OAuthFlowObject } from "./OAuthFlowObject"

/**
 * Allows configuration of the supported OAuth Flows.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauth-flows-object
 */
export interface OAuthFlowsObject extends ISpecificationExtension {
    /**
     * Configuration for the OAuth Implicit flow
     */
    implicit?: OAuthFlowObject
    /**
     * Configuration for the OAuth Resource Owner Password flow
     */
    password?: OAuthFlowObject
    /**
     * Configuration for the OAuth Client Credentials flow. 
     * Previously called `application` in OpenAPI 2.0.
     */
    clientCredentials?: OAuthFlowObject
    /**
     * Configuration for the OAuth Authorization Code flow. 
     * Previously called `accessCode` in OpenAPI 2.0.
     */
    authorizationCode?: OAuthFlowObject
}