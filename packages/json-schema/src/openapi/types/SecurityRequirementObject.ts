/**
 * Lists the required security schemes to execute this operation. 
 * The name used for each property MUST correspond to a security scheme declared in the Security Schemes under the Components Object.
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#security-requirement-object
 */
export interface SecurityRequirementObject {
    /**
     * Each name MUST correspond to a security scheme which is declared in the Security Schemes under the Components Object. 
     * If the security scheme is of type "oauth2" or "openIdConnect", then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. 
     * For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.
     */
    [name: string]: string[]
}