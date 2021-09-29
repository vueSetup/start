
import { ISpecificationExtension } from "./ISpecificationExtension"
import { PathItemObject } from "./PathItemObject"
import { ReferenceObject } from "./ReferenceObject"

/**
 * A map of possible out-of band callbacks related to the parent operation. 
 * Each value in the map is a Path Item Object that describes a set of requests that may be initiated by the API provider and the expected responses. 
 * The key value used to identify the path item object is an expression, evaluated at runtime, that identifies a URL to use for the callback operation.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#callback-object
 */
 export interface CallbackObject extends ISpecificationExtension {
    [name: string]: PathItemObject | ReferenceObject
}
