/**
 * While the Swagger Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.
 * The extensions properties are always prefixed by "x-" and can have any valid JSON format value.
 * The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions
 */
export interface ISpecificationExtension {
    // Cannot constraint to "^x-" but can filter them later to access to them
    [x: string]: any
}
