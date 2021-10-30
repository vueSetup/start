export interface XMLObject {
    /**
     * Replaces the name of the element/attribute used for the described schema property.
     * When defined within the Items Object(items), it will affect the name of the individual XML elements within the list.
     * When defined alongside type being array(outside the items),
     * it will affect the wrapping element and only if wrapped is true.
     * If wrapped is false, it will be ignored.
     */
    name: string,
    /**
     * The URL of the namespace definition. Value SHOULD be in the form of a URL.
     */
    namespcae: string,
    /**
     * The prefix to be used for the name.
     */
    prefix: string,
    /**
     * Declares whether the property definition translates to a atrribute instead of an element.
     * Default value is false.
     */
    attribute: boolean,
    /**
     * MAY be used only for an array definition. 
     * Signifies whether the array is wrapped(for example, <books><book/></book/></books>) or unwrapped (<book/><book/>).
     * Default value is false. The definition takes effect only when defined alongside type being array (outside the items).
     */
    wrapped: boolean

}