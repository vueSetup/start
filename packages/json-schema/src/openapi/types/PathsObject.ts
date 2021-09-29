import { ISpecificationExtension } from "./ISpecificationExtension"
import { PathItemObject } from "./PathItemObject"

/**
 * Holds the relative paths to the individual endpoints and their operations. 
 * The path is appended to the URL from the `Server Object` in order to construct the full URL. 
 * The Paths MAY be empty, due to `Access Control List (ACL) constraints`.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#paths-object
 */
export interface PathsObject extends ISpecificationExtension {
    [path: string]: PathItemObject
}
