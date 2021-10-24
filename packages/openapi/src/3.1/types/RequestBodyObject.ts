import { ISpecificationExtension } from "./ISpecificationExtension"
import { MediaTypeObject } from "./MediaTypeObject"

/**
 * Describes a single request body.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#request-body-object
 */
export interface RequestBodyObject extends ISpecificationExtension {
    /**
     * A brief description of the request body. 
     * This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
     */
    description?: string
    /**
     * **REQUIRED**.
     * The content of the request body. The key is a media type or media type range and the value describes it. 
     * For requests that match multiple keys, only the most specific key is applicable. 
     * e.g. text/plain overrides text/*
     */
    content: { [key: string]: MediaTypeObject }
    /**
     * Determines if the request body is required in the request. 
     * Defaults to false.
     */
    required?: boolean
}