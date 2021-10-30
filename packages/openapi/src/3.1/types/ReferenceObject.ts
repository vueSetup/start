/**
 * A simple object to allow referencing other components in the OpenAPI document, internally and externally.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#reference-object
 */
export interface ReferenceObject {
    /**
     * **REQUIRED**.
     * The reference identifier. This MUST be in the form of a URI.
     */
    $ref: string
    /**
     * A short summary which by default SHOULD override that of the referenced component. 
     * If the referenced object-type does not allow a summary field, then this field has no effect.
     */
    summary?: string
    /**
     * A description which by default SHOULD override that of the referenced component. 
     * CommonMark syntax MAY be used for rich text representation. 
     * If the referenced object-type does not allow a description field, then this field has no effect.
     */
    description?: string
}
