import { Swagger, OpenAPI } from "@lola/openapi"

export interface SchemaState {
    object: Swagger | OpenAPI | null
}

export interface AppState {
    schema: Swagger | OpenAPI | null
}
