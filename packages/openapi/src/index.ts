export * from './2.0'
export * from './3.1'

// TODO :: namespace
import { SwaggerObject } from './2.0'
import { OpenAPIObject } from './3.1'

export type { SwaggerObject, OpenAPIObject }

export const isSwaggerObject = (document: Record<string, any>): document is SwaggerObject => {
    return document?.swagger
}


export const isOpenAPIObject = (document: Record<string, any>): document is OpenAPIObject => {
    return document?.openapi
}
