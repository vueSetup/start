import { ref, reactive, watchEffect, toRefs, Ref } from "vue"
import { Swagger } from "@runes/openapi"
import request from "../utils/request"

export const useSchema = (api: Ref<string> = ref("/api/v2/api-docs")) => {
    const state = reactive<{
        schema: Swagger | null
    }>({
        schema: null
    })

    watchEffect(async () => {
        const doc = await request.get<any, Record<string, any>>(api.value)
        state.schema = new Swagger(doc)
    })

    return { ...toRefs(state) }
}