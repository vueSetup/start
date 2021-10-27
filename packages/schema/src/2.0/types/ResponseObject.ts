import { SchemaObject } from "./SchemaObject";
import { HeadersObject } from "./HeadersObject";
import { ExampleObject } from "./ExampleObject";
export interface ResponseObject {
    /**
     * **Required**.
     * A short description of the response. GFM syntax can be used for rich text representation.
     */
    description: string,
    /**
     * A definition of the response structure. It can be a primitive, an array or an object.
     * If this field does not exist, it means no content is returned as part of the response.
     * As an extension to the Schema Object, its root type value may also be "file".
     * This SHOULD be accompanied by a relevant produces mime-type.
     */
    schema: SchemaObject,
    /**
     * A list of headers that are sent with the response.
     */
    headers: HeadersObject,
    /**
     * A list of headers that are sent with the response.
     */
    examples: ExampleObject

 }
