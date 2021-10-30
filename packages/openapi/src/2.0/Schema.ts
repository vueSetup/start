import {
    DefinitionsObject,
    ExternalDocumentationObject,
    InfoObject,
    ParametersDefinitionsObject,
    PathsObject,
    ResponsesDefinitionsObject,
    SecurityDefinitionsObject,
    SecurityRequirementObject,
    SwaggerObject,
    TagObject
} from "./types";

class Schema implements SwaggerObject {
    swagger: string;
    info: InfoObject;
    host?: string
    basePath?: string
    schemes?: string[]
    consumes?: string[]
    produces?: string[]
    paths: PathsObject;
    definitions?: DefinitionsObject
    parameters?: ParametersDefinitionsObject
    responses?: ResponsesDefinitionsObject
    securityDefinitions?: SecurityDefinitionsObject
    security?: SecurityRequirementObject[]
    tags?: TagObject[]
    externalDocs?: ExternalDocumentationObject

    [x: string]: any;

    constructor(doc: Record<string, any>) {
        Object.assign(this, doc)
    }
}

export default Schema