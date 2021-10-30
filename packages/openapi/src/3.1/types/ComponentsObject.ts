import { ISpecificationExtension } from "./ISpecificationExtension";
import { SchemaObject } from "./SchemaObject";
import { ParameterObject } from "./ParameterObject";
import { ReferenceObject } from "./ReferenceObject";
import { ExampleObject } from "./ExampleObject";
import { HeaderObject } from "./HeaderObject";
import { LinkObject } from "./LinkObject";
import { ResponseObject } from "./ResponseObject";
import { RequestBodyObject } from "./RequestBodyObject";
import { PathItemObject } from "./PathItemObject";
import { CallbackObject } from "./CallbackObject";
import { SecuritySchemeObject } from "./SecuritySchemeObject";

/**
 * Holds a set of reusable objects for different aspects of the OAS. 
 * All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#components-object
 */
export interface ComponentsObject extends ISpecificationExtension {
    /**
     * An object to hold reusable `Schema Objects`.
     */
    schemas?: { [schema: string]: SchemaObject | ReferenceObject };
    /**
     * An object to hold reusable `Response Objects`.
     */
    responses?: { [response: string]: ResponseObject | ReferenceObject };
    /**
     * An object to hold reusable `Parameter Objects`.
     */
    parameters?: { [parameter: string]: ParameterObject | ReferenceObject };
    /**
     * An object to hold reusable `Example Objects`.
     */
    examples?: { [example: string]: ExampleObject | ReferenceObject };
    /**
     * An object to hold reusable `Request Body Objects`.
     */
    requestBodies?: { [request: string]: RequestBodyObject | ReferenceObject };
    /**
     * An object to hold reusable `Header Objects`.
     */
    headers?: { [header: string]: HeaderObject | ReferenceObject };
    /**
     * An object to hold reusable `Security Scheme Objects`.
     */
    securitySchemes?: { [securityScheme: string]: SecuritySchemeObject | ReferenceObject };
    /**
     * An object to hold reusable `Link Objects`.
     */
    links?: { [link: string]: LinkObject | ReferenceObject };
    /**
     * An object to hold reusable `Callback Objects`.
     */
    callbacks?: { [callback: string]: CallbackObject | ReferenceObject };
    /**
     * An object to hold reusable `Path Item Object`.
     */
    pathItems?: { [pathItem: string]: PathItemObject | ReferenceObject };
}