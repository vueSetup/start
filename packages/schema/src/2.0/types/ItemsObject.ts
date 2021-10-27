

export interface ItemsObject {
    type: string,
    format: string,
    items: ItemsObject,
    collectionFormat: string,
    default: *,
    maximum: number,
    exclusiveMaximum: boolean,
    minimum: number,
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