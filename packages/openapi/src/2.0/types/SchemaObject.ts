import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import { XMLObject } from "./XMLObject";
import { IPatternedObjects } from "./IPatternedObjects";
import { ReferenceObject } from "./ReferenceObject";

/**
 * TODO :: SchemaObject
 * 
 * The Schema Object allows the definition of input and output data types. 
 * These types can be objects, but also primitives and arrays. 
 * This object is based on the JSON Schema Specification Draft 4 and uses a predefined subset of it. 
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schema-object
 */
export type SchemaObject = {
    title?: string,
    description?: string
} & (
        {
            type: 'object',
            properties: {
                [name: string]: SchemaObject
            }
        } | {
            type: 'array',
            items: ReferenceObject
        } | {
            type: 'string' | 'integer' | 'number' | 'boolean' | 'null'
        }
    ) & IPatternedObjects


// export interface SchemaObject {
//     type: 'string' | 'integer' | 'number' | 'boolean' | 'object' | 'array' | 'null'
//     /**
//      * Adds support for polymorphism. This discriminator is the schema property
//      * name that is used to differentiate between other schema that inherit this schema.
//      * The property name used MUST be defined at this schema and it MUST be in the required property list.
//      * When used, the value MUST be the name of this schema or any schema that inherits it.
//      */
//     discriminator: string,
//     /**
//      * Relevant only for Schema "properties" definitions. Declares the property as "read only".
//      * This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request.
//      * Properties marked as readOnly being true SHOULD NOT be in the required list of the defined schema.
//      * Default value is false.
//      */
//     readOnly: boolean,
//     /**
//      * This MAY be used only on properties schemas. It has no effect on root schemas.
//      * Adds Additional metadata to describe the XML representation format of this property.
//      */
//     xml: XMLObject,
//     /**
//      * Additional external documentation for this schema.
//      */
//     externalDocs: ExternalDocumentationObject,
//     /**
//      * A free-from property to include an example of an instance for this schema.
//      */
//     example: any
// }