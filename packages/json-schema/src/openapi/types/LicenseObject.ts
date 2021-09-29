import { ISpecificationExtension } from "./ISpecificationExtension"

/**
 * License information for the exposed API.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#license-object
 */
export interface LicenseObject extends ISpecificationExtension {
    /**
     *  The license name used for the API.
     */
    name: string
    /**
     * An `SPDX` license expression for the API. 
     * The `identifier` field is mutually exclusive of the `url` field.
     */
    identifier: string
    /**
     * A URL to the license used for the API. 
     * This MUST be in the form of a URL. The url field is mutually exclusive of the `identifier` field.
     */
    url?: string
}
