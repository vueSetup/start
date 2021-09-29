import { ISpecificationExtension } from "./ISpecificationExtension"
import { ServerObject } from "./ServerObject"

/**
 * The Link object represents a possible design-time link for a response. 
 * The presence of a link does not guarantee the caller's ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other operations.

* https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#link-object
 */
export interface LinkObject extends ISpecificationExtension {
    /**
     * A relative or absolute URI reference to an OAS operation. 
     * This field is mutually exclusive of the operationId field, and MUST point to an Operation Object. 
     * Relative operationRef values MAY be used to locate an existing Operation Object in the OpenAPI definition. 
     * See the rules for resolving Relative References.
     */
    operationRef?: string
    /**
     * The name of an existing, resolvable OAS operation, as defined with a unique operationId. 
     * This field is mutually exclusive of the operationRef field.
     */
    operationId?: string
    /**
     * A map representing parameters to pass to an operation as specified with operationId or identified via operationRef. 
     * The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. 
     * The parameter name can be qualified using the parameter location [{in}.]{name} for operations that use the same parameter name in different locations (e.g. path.id).
     */
    parameters?: { [parameter: string]: any | string }
    /**
     * A literal value or `{expression}` to use as a request body when calling the target operation.
     */
    requestBody?: any | string
    /**
     * A description of the link. CommonMark syntax MAY be used for rich text representation.
     */
    description?: string
    /**
     * A server object to be used by the target operation.
     */
    server?: ServerObject
}