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
    /**
     * A relative path to an individual endpoint. 
     * The field name MUST begin with a forward slash (`/`). 
     * The path is appended (no relative URL resolution) to the expanded URL from the Server Object's url field in order to construct the full URL. 
     * Path templating is allowed. 
     * When matching URLs, concrete (non-templated) paths would be matched before their templated counterparts. 
     * Templated paths with the same hierarchy but different templated names MUST NOT exist as they are identical. 
     * In case of ambiguous matching, it's up to the tooling to decide which one to use.
     */
    [path: string]: PathItemObject
}
