import { ExampleObject } from "./ExampleObject"
import { ReferenceObject } from "./ReferenceObject"
import { SchemaObject } from "./SchemaObject"

/**
 * There are four possible parameter locations specified by the in field: "query", "header", "path" or "cookie".
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-locations
 */
export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie'

/**
 * In order to support common ways of serializing simple parameters, a set of style values are defined.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values
 */
export type ParameterStyle =
    | 'matrix'
    | 'label'
    | 'form'
    | 'simple'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'deepObject'

/**
 * Describes a single operation parameter.
 * A unique parameter is defined by a combination of a name and location.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-object
 */
export interface ParameterObject {
    /**
     * The name of the parameter. Parameter names are case sensitive.
     */
    name: string
    /**
     * The location of the parameter.
     */
    in: string
    /**
     * A brief description of the parameter. 
     * This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
     */
    description?: string
    /**
     * Determines whether this parameter is mandatory. 
     * If the parameter location is "path", this property is REQUIRED and its value MUST be true. 
     * Otherwise, the property MAY be included and its default value is false.
     */
    required?: boolean
    /**
     * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
     */
    deprecated?: boolean
    /**
     * Sets the ability to pass empty-valued parameters. 
     * This is valid only for query parameters and allows sending a parameter with an empty value. 
     * Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. 
     * Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
     */
    allowEmptyValue?: boolean
    /**
     * Describes how the parameter value will be serialized depending on the type of the parameter value. 
     * Default values (based on value of in): for query - form for path - simple for header - simple for cookie - form.
     */
    style?: string
    /**
     * When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. 
     * When style is form, the default value is true. For all other styles, the default value is false.
     */
    explode?: boolean
    /**
     * Determines whether the parameter value SHOULD allow reserved characters, 
     * as defined by RFC3986 :/?#[]@!$&'()*+,= to be included without percent-encoding. 
     * This property only applies to parameters with an in value of query. The default value is false.
     */
    allowReserved?: boolean
    /**
     * The schema defining the type used for the parameter.
     */
    schema?: SchemaObject 
    /**
     * Example of the parameter's potential value. 
     * The example SHOULD match the specified schema and encoding properties if present. 
     * The `example` field is mutually exclusive of the examples field. 
     * Furthermore, if referencing a `schema` that contains an example, the `example` value SHALL override the example provided by the schema. 
     * To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.
     */
    example: any
    /**
     * Example of the parameter's potential value. 
     * The example SHOULD match the specified schema and encoding properties if present. 
     * The example field is mutually exclusive of the examples field. 
     * Furthermore, if referencing a schema that contains an example, the example value SHALL override the example provided by the schema. 
     * To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.
     */
    examples?: { [example: string]: ExampleObject | ReferenceObject }
    /**
     * A map containing the representations for the parameter. 
     * The key is the media type and the value describes it.
     * The map MUST only contain one entry.
     */
}