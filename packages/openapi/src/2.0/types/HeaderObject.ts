
export interface HeaderObject {
    /**
     * A short description of the header.
     */
    description: string,
    /**
     * **Required**.
     * The type of the object. 
     * The value MUST be one of "string", "number", "integer", "boolean", or "array".
     */
    type: string,
    /**
     * The extending format for the previously mentioned type. 
     * See Data Type Formats for further details.
     */
    format: string,
    /**
     * **Required** if type is "array". Describes the type of items in the array.
     */
    items: ItemsObject,
    /**
     * Determines the format of the array if type array is used. Possible values are:
        csv - comma separated values foo,bar.
        ssv - space separated values foo bar.
        tsv - tab separated values foo\tbar.
        pipes - pipe separated values foo|bar.
        Default value is csv. 
     */
    collectionFormat: string,
    /**
     * Declares the value of the header that the server will use if none is provided. 
     * (Note: "default" has no meaning for required headers.) 
     * See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. 
     * Unlike JSON Schema this value MUST conform to the defined type for the header.
     */
    default: *,
    /**
     * See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
     */
    maximum: number,
    /**
     * See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
     */
    exclusiveMaximum: boolean,
    /**
     * See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
     */
    minimum: number,
    /**
     * See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
     */
    exclusiveMinimum: boolean,
    maxLength: integer,
    minLength: integer,
    pattern: string,
    maxItems: integer,
    minItems: integer,
    uniqueItems: boolean,
    enum: [*],
    multipleOf: number
    
}