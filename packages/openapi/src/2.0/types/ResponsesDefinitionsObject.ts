import { ResponseObject } from "./ResponseObject";

/**
 * An object to hold responses to be reused across operations. 
 * Response definitions can be referenced to the ones defined here.
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responses-definitions-object
 */
export interface ResponsesDefinitionsObject {
    /**
     * A single response definition, mapping a "name" to the response it defines.
     */
    name: ResponseObject

}