import { ISpecificationExtension } from "./ISpecificationExtension"
import { ReferenceObject } from "./ReferenceObject"
import { ResponseObject } from "./ResponseObject"

/**
 * A container for the expected responses of an operation.
 * The container maps a HTTP response code to the expected response.
 * It is not expected from the documentation to necessarily cover all possible HTTP response codes, since they may not be known in advance.
 * However, it is expected from the documentation to cover a successful operation response and any known errors.
 * 
 * The default can be used as the default response object for all HTTP codes that are not covered individually by the specification.
 * The Responses Object MUST contain at least one response code, and it SHOULD be the response for a successful operation call.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#responsesObject
 */
export interface ResponsesObject extends ISpecificationExtension {
    /**
     * The documentation of responses other than the ones declared for specific HTTP response codes.
     * It can be used to cover undeclared responses.
     * Reference Object can be used to link to a response that is defined at the Swagger Object's responses section.
     */
    default: ResponseObject | ReferenceObject
    /**
     * Any HTTP status code can be used as the property name (one property per HTTP status code).
     * Describes the expected response for that HTTP status code.
     * Reference Object can be used to link to a response that is defined at the Swagger Object's responses section.
     */
    [statuscode: string]: ResponseObject | ReferenceObject
}