import { IPatternedObjects } from "./IPatternedObjects";

/**
 * Contact information for the exposed API.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#contact-object
 */
export interface ContactObject extends IPatternedObjects {
    /**
     * The identifying name of the contact person/organization.
     */
    name: string,
    /**
     * The URL pointing to the contact information. 
     * MUST be in the format of a URL.
     */
    url: string,
    /**
     * The email address of the contact person/organization. 
     * MUST be in the format of an email address.
     */
    email: string
}