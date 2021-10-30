import {
    ComponentsObject,
    ExternalDocumentationObject,
    InfoObject,
    OpenAPIObject,
    PathItemObject,
    PathsObject,
    ReferenceObject,
    SecurityRequirementObject,
    ServerObject,
    TagObject
} from './types'

class Schema implements OpenAPIObject {
    openapi: string
    info: InfoObject
    jsonSchemaDialect?: string
    servers?: ServerObject[]
    paths?: PathsObject
    webhooks?: { [webhook: string]: PathItemObject | ReferenceObject }
    components?: ComponentsObject
    security?: SecurityRequirementObject[]
    tags?: TagObject[]
    externalDocs?: ExternalDocumentationObject

    [x: string]: any

    constructor(doc: Record<string, any>) {
        Object.assign(this, doc)
    }
}

export default Schema