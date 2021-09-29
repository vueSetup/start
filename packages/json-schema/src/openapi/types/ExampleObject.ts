/**
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#example-object
 */
export interface ExampleObject {
    /**
     * Short description for the example.
     */
    summary?: string
    /**
     * Long description for the example. CommonMark syntax MAY be used for rich text representation.
     */
    description?: string
    /**
     * Embedded literal example. 
     * The value field and externalValue field are mutually exclusive. 
     * To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.
     */
    value?: any
    /**
     * A URI that points to the literal example. 
     * This provides the capability to reference examples that cannot easily be included in JSON or YAML documents. 
     * The value field and externalValue field are mutually exclusive. See the rules for resolving Relative References.
     */
    externalValue?: string
}