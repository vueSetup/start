import { DefinitionsObject } from "./DefinitionsObject";
import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import { InfoObject } from "./InfoObject";
import { IPatternedObjects } from "./IPatternedObjects";
import { ParametersDefinitionsObject } from "./ParametersDefinitionsObject";
import { PathsObject } from "./PathsObject";
import { ResponsesDefinitionsObject } from "./ResponsesDefinitionsObject";
import { SecurityDefinitionsObject } from "./SecurityDefinitionsObject";
import { SecurityRequirementObject } from "./SecurityRequirementObject";
import { TagObject } from "./TagObject";

/**
 * This is the root document object for the API specification. 
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swagger-object
 */
export interface SwaggerObject extends IPatternedObjects {
    /**
     * Required. 
     * Specifies the Swagger Specification version being used. 
     * It can be used by the Swagger UI and other clients to interpret the API listing. 
     * The value MUST be `"2.0"`.
     */
    swagger: string,
    /**
     * Required. 
     * Provides metadata about the API. The metadata can be used by the clients if needed.
     */
    info: InfoObject,
    /**
     * The host (name or ip) serving the API. 
     * This MUST be the host only and does not include the scheme nor sub-paths. 
     * It MAY include a port. If the host is not included, the host serving the documentation is to be used (including the port). 
     * The host does not support path templating.
     */
    host?: string,
    /**
     * The base path on which the API is served, which is relative to the host. 
     * If it is not included, the API is served directly under the host. 
     * The value MUST start with a leading slash (/). The basePath does not support path templating.
     */
    basePath?: string,
    /**
     * The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. 
     * If the `schemes` is not included, the default scheme to be used is the one used to access the Swagger definition itself.
     */
    schemes?: string[],
    /**
     * A list of MIME types the APIs can consume. 
     * This is global to all APIs but can be overridden on specific API calls. 
     * Value MUST be as described under Mime Types.
     */
    consumes?: string[],
    /**
     * A list of MIME types the APIs can produce. 
     * This is global to all APIs but can be overridden on specific API calls. 
     * Value MUST be as described under Mime Types.
     */
    produces?: string[],
    /**
     * Required. 
     * The available paths and operations for the API.
     */
    paths: PathsObject,
    /**
     * An object to hold data types produced and consumed by operations.
     */
    definitions?: DefinitionsObject,
    /**
     * An object to hold parameters that can be used across operations. 
     * This property does not define global parameters for all operations.
     */
    parameters?: ParametersDefinitionsObject,
    /**
     * An object to hold responses that can be used across operations. 
     * This property does not define global responses for all operations.
     */
    responses?: ResponsesDefinitionsObject,
    /**
     * Security scheme definitions that can be used across the specification.
     */
    securityDefinitions?: SecurityDefinitionsObject,
    /**
     * A declaration of which security schemes are applied for the API as a whole. 
     * The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). 
     * Individual operations can override this definition.
     */
    security?: SecurityRequirementObject[],
    /**
     * A list of tags used by the specification with additional metadata. 
     * The order of the tags can be used to reflect on their order by the parsing tools. 
     * Not all tags that are used by the Operation Object must be declared. 
     * The tags that are not declared may be organized randomly or based on the tools' logic. 
     * Each tag name in the list MUST be unique.
     */
    tags?: TagObject[],
    /**
     * Additional external documentation.
     */
    externalDocs?: ExternalDocumentationObject
}