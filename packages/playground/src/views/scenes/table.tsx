import { defineComponent, reactive, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Card, Table, Input, Checkbox, Select, Button } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { MonacoEditor } from '@/components'
import { useTable } from '@/composables'
import { Swagger } from '@runes/openapi'

export type Column = {
    dataIndex: string
    title?: string
    color?: boolean
    arrow?: boolean
    layout?: boolean
    show?: boolean
}

export type Settings = {
    columns: Column[]
}

const { Option } = Select
const columns = [
    {
        dataIndex: 'dataIndex',
        title: '字段'
    },
    {
        dataIndex: 'title',
        title: '标题',
        customRender: ({ text, record, index, column }) => (
            <Input
                // style={{ width: '240px' }}
                v-model={[record.title, 'value']}
            />
        )
    },
    {
        dataIndex: 'dataIndex',
        title: '是否显示',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                onChange={(e) => {
                    if (e.target.checked) {
                        record.show = true
                    } else {
                        delete record.show
                    }
                }}
            />
        )
    },
    {
        dataIndex: 'color',
        title: '颜色',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                onChange={(e) => {
                    if (e.target.checked) {
                        record.color = true
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
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                onChange={(e) => {
                    if (e.target.checked) {
                        record.arrow = true
                    } else {
                        delete record.arrow
                    }
                }}
            />
        )
    },
    {
        dataIndex: 'layout',
        title: '响应性',
        customRender: ({ text, record, index, column }) => (
            <Select
                style={{ width: '120px' }}
                onChange={(value, option) => {
                    if (!value || value === 'display') {
                        delete record.layout
                    } else {
                        record.layout = value
                    }
                }}
            >
                <Option value='display'>显示</Option>
                <Option value='horizontal'>横向显示</Option>
                <Option value='vertical'>纵向显示</Option>
            </Select>
        )
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
            code: string,
            layout: 'horizontal' | 'vertical'
        }>({
            data: [],
            code: '',
            layout: 'horizontal'
        })

        const schema = store.getters[`schema/object`] as Swagger

        const generateBasicColumns = () => {
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
        }

        watchEffect(() => {
            generateBasicColumns()
        })

        watchEffect(() => {
            const data = state.data
                .filter(item => item.show)
                .map(item => omit(item, 'show')
            )
            const { code } = useTable(data, state.layout)
            state.code = code.value
        })

        const handleReset = () => {
            generateBasicColumns()
        }

        return { ...toRefs(state), handleReset }

    },
    render() {
        const extraDom = (
            <>
                <Select
                    style={{ width: '120px' }}
                    v-model={[this.layout, 'value']}
                >
                    <Option value='horizontal'>横向布局</Option>
                    <Option value='vertical'>纵向布局</Option>
                </Select>
                <Button onClick={this.handleReset} style={{ marginLeft: '8px' }}>重置</Button>
            </>
        )
        return (
            <>
                {JSON.stringify(this.data)}
                <Card
                    extra={extraDom}
                >
                    <Table
                        size="middle"
                        columns={columns}
                        dataSource={this.data}
                        pagination={false}
                    />
                </Card>
                <MonacoEditor value={this.code} />
            </>
        )
    }
})
