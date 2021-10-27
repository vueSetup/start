import { ref, reactive, watchEffect, toRefs, Ref } from 'vue'

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
// TODO :: esModuleInterop
// https://zhuanlan.zhihu.com/p/148081795
import * as t from '@babel/types'
import generator from '@babel/generator'

import { useSchema } from "./useSchema"

export const useTransform = (name: string) => {
    const state = reactive<{
        code: string
    }>({
        code: ""
    })

    const { schema } = useSchema()

    watchEffect(() => {
        if (schema.value) {
            const definition = schema.value.definitions![name]
            if (definition.type == "object") {
                const members = Object.entries(definition.properties).map(([name, schema]) => {
                    const tsPropertySignature = () => {
                        switch (schema.type) {
                            case 'string':
                                return t.tsPropertySignature(t.identifier(name), t.tsTypeAnnotation(t.tsStringKeyword()))
                            case 'integer':
                                return t.tsPropertySignature(t.identifier(name), t.tsTypeAnnotation(t.tsBigIntKeyword()))
                            case 'number':
                                return t.tsPropertySignature(t.identifier(name), t.tsTypeAnnotation(t.tsNumberKeyword()))
                            case 'boolean':
                                return t.tsPropertySignature(t.identifier(name), t.tsTypeAnnotation(t.tsBooleanKeyword()))
                            default:
                                return t.tsPropertySignature(t.identifier(name), t.tsTypeAnnotation(t.tsAnyKeyword()))
                        }
                    }
                    return t.addComment(tsPropertySignature(), 'leading', `*\r\n* ${schema.title || schema.description}\r\n`)
                })

                const ast = t.tsTypeAliasDeclaration(t.identifier(name), null, t.tsTypeLiteral(members))

                const { code } = generator(ast)

                state.code = code
            }
        }
    })

    return { ...toRefs(state) }
}
