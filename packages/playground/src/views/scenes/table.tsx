import { defineComponent, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { Table, Checkbox } from 'ant-design-vue'
import { MonacoEditor } from '@/components'
import { useTable } from '@/composables'
import { Swagger } from '@lola/openapi'

export type Column = {
    dataIndex: string
    title?: string
    color?: boolean
    arrow?: boolean
    responsive?: boolean
}

export type Settings = {
    columns: Column[]
}

const columns = [
    {
        dataIndex: 'dataIndex',
        title: '字段'
    },
    {
        dataIndex: 'title',
        title: '标题'
    },
    {
        dataIndex: 'color',
        title: '颜色',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                onChange={(e) => {
                    const checked = e.target.checked
                    debugger
                    if (checked) {
                        record.color = 'true'
                    } else {
                        delete record.color
                    }
                }}
            />
        )
    },
    {
        dataIndex: 'arrow',
        title: '箭头',
        customRender: () => <Checkbox />
    },
    {
        dataIndex: 'layout',
        title: '响应性',
        customRender: () => <Checkbox />
    }
]

export default defineComponent({
    props: {
        operationId: String
    },
    setup(props) {
        const store = useStore()

        const state = reactive<{
            data: Column[]
            code: string
        }>({
            data: [],
            code: ''
        })

        const schema = store.getters[`schema/object`] as Swagger

        watchEffect(() => {
            Object.entries(schema.paths).forEach(([name, path]) => {
                if (path.get.operationId === props.operationId) {
                    // @ts-ignore
                    const name = path.get.responses['200'].schema.originalRef
                    const schemaObject = schema.definitions![name]
                    if (schemaObject.type === 'object') {
                        const data = schemaObject.properties['data']
                        if (data.type === 'array') {
                            // @ts-ignore
                            const schemaName = data.items.originalRef
                            const target = schema.definitions![schemaName]
                            if (target.type === 'object') {
                                state.data = Object.entries(target.properties).map(
                                    ([name, item]) => ({
                                        dataIndex: name,
                                        title: item.description
                                    })
                                )
                            }
                        }
                    }
                }
            })
        })

        watchEffect(() => {
            const { code } = useTable(state.data)
            state.code = code.value
        })

        return () => (
            <>
                {JSON.stringify(state.data)}
                <Table
                    size="middle"
                    columns={columns}
                    dataSource={state.data}
                    pagination={false}
                />
                <MonacoEditor value={state.code} />
            </>
        )
    }
})
