import { ISpecificationExtension } from "./ISpecificationExtension"

/**
 * Contact information for the exposed API.
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contact-object
 */
export interface ContactObject extends ISpecificationExtension {
    /**
     * The identifying name of the contact person/organization.
     */
    name?: string
    /**
     * The URL pointing to the contact information. 
     * This MUST be in the form of a URL.
     */
    url?: string
    /**
     * The email address of the contact person/organization. 
     * This MUST be in the form of an email address.
     */
    email?: string
}