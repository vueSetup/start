import { ISpecificationExtension } from "./ISpecificationExtension"

/**
 * Allows referencing an external resource for extended documentation.
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#external-documentation-object
 */
export interface ExternalDocumentationObject extends ISpecificationExtension {
   /**
    * A description of the target documentation. 
    * CommonMark syntax MAY be used for rich text representation.
    */
   description?: string
   /**
    * **REQUIRED**.
    * The URL for the target documentation. This MUST be in the form of a URL.
    */
   url: string
}