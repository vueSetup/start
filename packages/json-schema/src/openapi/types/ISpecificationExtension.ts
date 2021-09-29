// Suport for Specification Extensions
// as described in
// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specification-extensions

//  The extensions properties are implemented as patterned fields that are always prefixed by "x-".
export interface ISpecificationExtension {
    // Cannot constraint to "^x-" but can filter them later to access to them
    [x: string]: any
}
