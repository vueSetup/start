import { ISpecificationExtension } from "./ISpecificationExtension"
import { ExternalDocumentationObject } from "./ExternalDocumentationObject"
import { DiscriminatorObject } from "./DiscriminatorObject"
import { XMLObject } from "./XMLObject"
import { ReferenceObject } from "./ReferenceObject"

/**
 * TODO :: Schema Object
 * The Schema Object allows the definition of input and output data types. 
 * These types can be objects, but also primitives and arrays. 
 * This object is a superset of the JSON Schema Specification Draft 2020-12.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schema-object
 */
export interface SchemaObject extends ISpecificationExtension {
    type: 'string' | 'integer' | 'number' | 'boolean' | 'object' | 'array' | 'null'

    title?: string

    description?: string

    properties?: { [name: string]: SchemaObject | ReferenceObject }

    required?: string[]
    
    /**
     * Adds support for polymorphism. 
     * The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. 
     */
    discriminator?: DiscriminatorObject
    /**
     * This MAY be used only on properties schemas. 
     * It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property.
     */
    xml?: XMLObject
    /**
     * Additional external documentation for this schema.
     */
    externalDocs?: ExternalDocumentationObject
    /**
     * A free-form property to include an example of an instance for this schema. 
     * To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.
     */
    example?: any
}