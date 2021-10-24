import { ContactObject } from "./ContactObject";
import { IPatternedObjects } from "./IPatternedObjects";
import { LicenseObject } from "./LicenseObject";

/**
 * This is the root document object for the API specification. 
 * It combines what previously was the Resource Listing and API Declaration (version 1.2 and earlier) together into one document.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swagger-object
 */
export interface InfoObject extends IPatternedObjects {
    /**
     * Required. 
     * The title of the application.
     */
    title: string,
    /**
     * A short description of the application. 
     * GFM syntax can be used for rich text representation.
     */
    description: string,
    /**
     * The Terms of Service for the API.
     */
    termsOfService: string,
    /**
     * The contact information for the exposed API.
     */
    contact: ContactObject,
    /**
     * The license information for the exposed API.
     */
    license: LicenseObject,
    /**
     * Required.
     * Provides the version of the application API (not to be confused with the specification version).
     */
    version: string
}