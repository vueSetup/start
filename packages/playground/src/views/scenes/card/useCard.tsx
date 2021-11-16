import { reactive, toRefs, watchEffect } from "vue"

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'


export type Field = {
    dataIndex: string
    title?: string
    showColor?: boolean
    showArrow?: boolean
    show?: boolean
}

export const useCard = (api: string, fields: Field[], title: string, unit: string, md: number) => {

    const source = `
    import { defineComponent, PropType, reactive, watchEffect } from 'vue'
    import { useRouteContext } from '@/shared/RouteContext'
    import { Card, CardField } from '@/components'
    import request from '@/utils/request'
    import { thousands, day, month, number, postData } from '@/utils/format'

    const fields: CardField[] = []

    export default defineComponent({
        setup() {
            const context = useRouteContext()

            const params = reactive<Record<string, any>>({
                dataTime: day(context.selectedDate)
            })

            watchEffect(() => {
                Object.assign(params, {
                    dataTime: day(context.selectedDate)
                })
            })

            const fetchData = async (params: Record<string, any>) => {
                return await request.get<any, Record<string, any>[]>('/api', {
                    params
                })
            }

            return () => (
                <Card
                    title=""
                    unit=""
                    md={12}
                    fields={fields}
                    request={fetchData}
                    params={{ ...params }}
                />
            )
        }
    })
    `

    const state = reactive<{
        code: string
    }>({
        code: ''
    })

    watchEffect(() => {
        const elements = fields.map(field => {
            let properties = []
            for (const [key, value] of Object.entries(field || {})) {
                if (typeof value === 'string') {
                    //@ts-ignore
                    properties.push(t.objectProperty(t.stringLiteral(key), t.stringLiteral(value)))
                }
                if (typeof value === 'boolean') {
                    //@ts-ignore
                    properties.push(t.objectProperty(t.stringLiteral(key), t.booleanLiteral(value)))
                }
            }
            return t.objectExpression(properties)
        })

        const replacement = t.arrayExpression(elements)

        const ast = parse(source, {
            plugins: ['typescript', 'jsx'],
            sourceType: 'module'
        })

        traverse(ast, {
            VariableDeclaration(path) {
                //@ts-ignore
                if (path.node.declarations[0].id.name === 'fields') {
                    path.node.declarations[0].init = replacement
                }
            },
            StringLiteral(path) {
                if (path.node.value === '/api') {
                    path.node.value = '/api' + api
                }
            },
            JSXAttribute(path) {
                if (path.node.name.name === 'title') {
                    if (title) {
                        path.node.value = t.stringLiteral(title)
                    } else {
                        //@ts-ignore
                        const index = path.parent.attributes.findIndex(item => item.name.name === 'title')
                        //@ts-ignore
                        path.parent.attributes.splice(index, 1)
                    }
                }
                if (path.node.name.name === 'unit') {
                    if (unit) {
                        path.node.value = t.stringLiteral(unit)
                    } else {
                        //@ts-ignore
                        const index = path.parent.attributes.findIndex(item => item.name.name === 'unit')
                        //@ts-ignore
                        path.parent.attributes.splice(index, 1)
                    }
                }
                if (path.node.name.name === 'md') {
                    path.node.value = t.jsxExpressionContainer(t.numericLiteral(md))
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