import {
    ComponentsObject,
    ExternalDocumentationObject,
    InfoObject,
    OpenAPIObject,
    PathItemObject,
    PathsObject,
    ReferenceObject,
    SchemaObject,
    SecurityRequirementObject,
    ServerObject,
    TagObject
} from "./types"

export class OpenApi implements OpenAPIObject {
    openapi: string;
    info: InfoObject;
    jsonSchemaDialect?: string;
    servers?: ServerObject[];
    paths: PathsObject;
    webhooks?: { [webhook: string]: PathItemObject | ReferenceObject; };
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;

    constructor(document: Record<string, any>) {
        Object.assign(this, document)
    }

    static parse = (json: string) => {
        return new OpenApi(JSON.parse(json))
    }

    getGraphData = () => {
        const data = { nodes: [], edges: [] }
        for (const [name, schema] of Object.entries(this.components.schemas || {})) {
            data.nodes.push({ id: name.toLowerCase(), label: name, data: schema })
            if (!this.isReferenceObject(schema)) {
                for (const [propName, propSchema] of Object.entries(schema.properties || {})) {
                    if (this.isReferenceObject(propSchema)) {
                        data.edges.push({ source: name.toLowerCase(), target: propName.toLowerCase() })
                    }
                }
            }
        }
        return data
    }

    // getReferences = (schema: SchemaObject | ReferenceObject, edges: string[]) => {
    //     if (this.isReferenceObject(schema)) {
    //         const object = this.getReferenceObject(schema.$ref)
    //         data.nodes.push({ id: name, data: object })
    //     } else {

    //     }
    // }

    getSchemaObjects = (): SchemaObject[] => {
        const schemas = [] as SchemaObject[]
        for (const [name, schema] of Object.entries(this.components.schemas || {})) {
            if (this.isReferenceObject(schema)) {
                const object = this.getReferenceObject(schema.$ref)
                schemas.push(object)
            } else {
                schemas.push(schema)
            }
        }
        return schemas
    }

    isReferenceObject = (object: any): object is ReferenceObject => object?.hasOwnProperty('$ref')

    getReferenceObject = ($ref: string): SchemaObject => {
        if (!$ref.startsWith("#/")) return
        const paths = $ref.substring(2).split('/')
        return this.getIn(paths)
    }

    getIn = (paths: string[], current?: Record<string, any>): SchemaObject => {
        current = current ? current[paths.shift()] : this[paths.shift()]
        if (paths.length > 0) {
            return this.getIn(paths, current)
        } else {
            return current as SchemaObject
        }
    }
}
