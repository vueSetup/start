import { reactive, toRefs, watchEffect } from "vue"

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'

export const useTable = (columns: Record<string, any>[]) => {
    const source = `
                const columns = []
                const foo = <Table columns = { columns } />
            `

    const state = reactive<{
        code: string
    }>({
        code: ""
    })

    watchEffect(() => {
        const elements = columns.map((column) => {
            let properties = []
            for (const [key, value] of Object.entries(column || {})) {
                properties.push(t.objectProperty(t.stringLiteral(key), t.stringLiteral(value)))
            }
            return t.objectExpression(properties)
        })

        const replacement = t.arrayExpression(elements)

        const ast = parse(source, {
            plugins: ['typescript', 'jsx']
        })

        traverse(ast, {
            enter(path) {
                // @ts-ignore
                if (path.node.body) {
                    // @ts-ignore
                    path.node.body[0].declarations[0].init = replacement
                }
            }
        })

        const { code } = generate(
            ast,
            {
                /* options */
            },
            source
        )

        state.code = unescape(code.replace(/\\u/g, "%u"))
    })

    return { ...toRefs(state) }
}