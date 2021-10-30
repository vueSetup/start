import { ParameterObject } from "./ParameterObject";

/**
 * An object to hold parameters to be reused across operations. 
 * Parameter definitions can be referenced to the ones defined here.
 * 
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#parameters-definitions-object
 */
export interface ParametersDefinitionsObject {
    /**
     *  A single parameter definition, mapping a "name" to the parameter it defines.
     */
  name: ParameterObject
}