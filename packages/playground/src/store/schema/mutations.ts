import { MutationTree } from 'vuex';
import { SchemaState } from '../typings';
import { Swagger, SwaggerObject, isSwaggerObject, OpenAPI, OpenAPIObject, isOpenAPIObject } from "@runes/openapi"

export const SET_SCHEMA = 'setSchema'

export const mutations: MutationTree<SchemaState> = {
    [SET_SCHEMA](state: SchemaState, schema: SwaggerObject | OpenAPIObject) {
        if (isSwaggerObject(schema)) {
            state.object = new Swagger(schema)
        }
        if (isOpenAPIObject(schema)) {
            state.object = new OpenAPI(schema)
        }
    }
}