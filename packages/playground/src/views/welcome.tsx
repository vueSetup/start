import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { InputSearch } from 'ant-design-vue'
import { FETCH_DATA } from '@/store/schema/actions'
import request from '@/utils/request'

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'

export default defineComponent({
    setup() {
        const store = useStore()

        onMounted(() => {
            toAST()
        })

        const toAST = () => {
            const source = `
                const columns = []
                const foo = <Table columns = { columns } />
            `

            const columns = [
                { dataIndex: 'dataTime', title: '日期' },
                { dataIndex: 'lastYear', title: '上年同期' },
                { dataIndex: 'month', title: '月份' },
                { dataIndex: 'orgName', title: '组织名称' },
                { dataIndex: 'value', title: '本月实际' },
                { dataIndex: 'yoyc', title: '年累计同比' }
            ]

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

            console.log(unescape(code.replace(/\\u/g, "%u")))
        }

        // http://11.11.160.192:48810/v2/api-docs
        const onSearch = async (url: string) => {
            await store.dispatch(`schema/${FETCH_DATA}`)
        }

        return () => (
            <InputSearch
                size="large"
                enter-button
                placeholder="直接点击查询就可以，这是个假的输入框。"
                onSearch={onSearch}
            />
        )
    }
})
