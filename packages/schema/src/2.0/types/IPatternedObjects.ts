/**
 * Suport for Patterned Objects
 * Allows extensions to the Swagger Schema. 
 * The field name MUST begin with x-, for example, x-internal-id. The value can be null, a primitive, an array or an object.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#patterned-objects
 */
export interface IPatternedObjects {
    // Cannot constraint to "^x-" but can filter them later to access to them
    [x: string]: any
}
