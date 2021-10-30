import { defineComponent, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { Table } from 'ant-design-vue'
import { Swagger } from '@lola/openapi'

export type Column = {
    dataIndex: string
    title?: string
    color?: boolean
    arrow?: boolean
}

export type Settings = {
    columns: Column[]
}

export default defineComponent({
    props: {
        operationId: String
    },
    setup(props) {
        const store = useStore()

        const state = reactive<{
            columns: Column[]
        }>({
            columns: []
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
                                state.columns = Object.entries(target.properties).map(
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
                title: '颜色'
            },
            {
                dataIndex: 'arrow',
                title: '箭头'
            }
        ]

        return () => <Table columns={columns} dataSource={state.columns} pagination={false} />
    }
})
