/**
 * Suport for Specification Extensions
 * While the OpenAPI Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.
 * The extensions properties are implemented as patterned fields that are always prefixed by "x-".
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specification-extensions
 */
export interface ISpecificationExtension {
    // Cannot constraint to "^x-" but can filter them later to access to them
    [x: string]: any
}
