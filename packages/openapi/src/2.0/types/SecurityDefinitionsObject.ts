import { SecuritySchemeObject } from "./SecuritySchemaObject";
/**
 * A declaration of the security schemes available to be used in the specification. 
 * This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#security-definitions-object
 */
export interface SecurityDefinitionsObject {
    /**
     * A single security schema definition, mapping a "name" to the schema it defines.
     */
    name: SecuritySchemeObject
}