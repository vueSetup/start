import { reactive, toRefs, watchEffect } from "vue"

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'

export const useTable = (columns: Record<string, any>[], layout: 'horizontal' | 'vertical' = 'horizontal', api: string) => {
    // const source = `
    // const columns: TableColumn[] = []
    // const foo = <Table columns = { columns } />
    // `

    const source = `
    import { defineComponent, reactive, watchEffect } from 'vue'
    import { Table, TableColumn } from '@/components'
    import { useRouteContext } from '@/shared/RouteContext'
    import { Chart, ChartParams, LegendItem } from '@antv/f2'
    import { alignPlugin } from '@/plugins/align'
    import { useChart } from '@antv/f2-vue-use'
    import request from '@/utils/request'
    import { thousands, day, month, number, yearMonth, postData } from '@/utils/format'

    const columns: TableColumn[] = []

    export default defineComponent({
        setup() {
            const context = useRouteContext()
            const { isPhone } = context

            const params = reactive<Record<string, any>>({
                dataTime: day(context.selectedDate)
            })

            const fetchData = async (params: Record<string, any>) => {
                return await request.get<any, Record<string, any>[]>('/api', {
                    params
                })
            }

            const { container } = useChart(options, fetchData, postData, params, chartChain)

            return () => (
                <>
                    <canvas ref={container} />
                    <Table columns={columns} request={fetchData} params={params} />
                </>
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
            plugins: ['typescript', 'jsx'],
            sourceType: 'module'
        })

        traverse(ast, {
            // enter(path) {
            //     // @ts-ignore
            //     if (path.node.body) {
            //         // @ts-ignore
            //         path.node.body[0].declarations[0].init = replacement
            //         // @ts-ignore
            //         path.node.body[1].declarations[0].init.openingElement.attributes.push(tableAttribute)
            //     }
            // }
            VariableDeclaration(path) {
                //@ts-ignore
                if (path.node.declarations[0].id.name === 'columns') {
                    path.node.declarations[0].init = replacement
                }
            },
            StringLiteral(path) {
                if (path.node.value === '/api') {
                    path.node.value = '/api' + api
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