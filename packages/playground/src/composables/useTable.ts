import { reactive, toRefs, watchEffect } from "vue"

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'

export const useTable = (columns: Record<string, any>[], layout: 'horizontal' | 'vertical' = 'horizontal') => {
    const source = `
                const columns = []
                const foo = <Table columns = { columns } />
            `

    const state = reactive<{
        code: string
    }>({
        code: ''
    })

    watchEffect(() => {
        const elements = columns.map((column) => {
            let properties = []
            for (const [key, value] of Object.entries(column || {})) {
                if (typeof value === 'string') {
                    properties.push(t.objectProperty(t.stringLiteral(key), t.stringLiteral(value)))
                }
                if (typeof value === 'boolean') {
                    properties.push(t.objectProperty(t.stringLiteral(key), t.booleanLiteral(value)))
                }
            }
            return t.objectExpression(properties)
        })

        const replacement = t.arrayExpression(elements)
        const tableAttribute = t.jsxAttribute(t.jsxIdentifier('layout'), t.stringLiteral(layout))

        const ast = parse(source, {
            plugins: ['typescript', 'jsx']
        })

        traverse(ast, {
            enter(path) {
                // @ts-ignore
                if (path.node.body) {
                    // @ts-ignore
                    path.node.body[0].declarations[0].init = replacement
                    // @ts-ignore
                    path.node.body[1].declarations[0].init.openingElement.attributes.push(tableAttribute)
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