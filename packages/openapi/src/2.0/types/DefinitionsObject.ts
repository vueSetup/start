import { SchemaObject } from "./SchemaObject";

/**
 * An object to hold data types that can be consumed and produced by operations. 
 * These data types can be primitives, arrays or models.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#definitions-object
 */
export interface DefinitionsObject {
    /** 
    * A single definition, mapping a "name" to the schema it defines.
    **/
    [name: string]: SchemaObject
}