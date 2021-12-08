import { defineComponent, reactive, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Card, Tabs, TabPane, Table, Input, Checkbox, Select, Button } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { MonacoEditor } from '@/components'
import { useTable } from '@/composables'
import { Swagger } from '@lola/openapi'
import { BasicColumn, Multiple, BasicLine, BasicArea, Donut, StackArea, StackColumn } from './scenes/chart'
import { StatisticCard } from './scenes/card'

export type Column = {
    dataIndex: string
    title?: string
    showColor?: boolean
    showArrow?: boolean
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
                v-model={[record.title, 'value']}
            />
        )
    },
    {
        dataIndex: 'dataIndex',
        title: '是否显示',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                v-model={[record.show, 'checked']}
            />
        )
    },
    {
        dataIndex: 'showColor',
        title: '颜色',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                v-model={[record.showColor, 'checked']}
                onChange={(e) => {
                    if (!e.target.checked) {
                        delete record.showColor
                    }
                }}
            />
        )
    },
    {
        dataIndex: 'showArrow',
        title: '箭头',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                v-model={[record.showArrow, 'checked']}
                onChange={(e) => {
                    if (!e.target.checked) {
                        delete record.showArrow
                    }
                }}
            />
        )
    },
    {
        dataIndex: 'layout',
        title: '仅横向展示',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                v-model={[record.layout, 'checked']}
                onChange={(e) => {
                    if (!e.target.checked) {
                        delete record.layout
                    } else {
                        record.layout = 'horizontal'
                    }
                }}
            />
        )
    }
    // {
    //     dataIndex: 'layout',
    //     title: '响应性',
    //     customRender: ({ text, record, index, column }) => (
    //         <Select
    //             style={{ width: '120px' }}
    //             v-model={[record.layout, 'value']}
    //             onChange={(value, option) => {
    //                 if (!value || value === 'display') {
    //                     delete record.layout
    //                 }
    //             }}
    //         >
    //             <Option value='display'>显示</Option>
    //             <Option value='horizontal'>横向显示</Option>
    //             <Option value='vertical'>纵向显示</Option>
    //         </Select>
    //     )
    // }
]

export default defineComponent({
    props: {
        operationId: String
    },
    setup(props) {
        const store = useStore()

        const state = reactive<{
            data: Column[],
            options: { value: string; label?: string; }[],
            fields: Column[],
            api: string,
            layout: 'horizontal' | 'vertical',
            code: string
        }>({
            data: [],
            options: [],
            fields: [],
            api: '',
            layout: 'horizontal',
            code: ''
        })

        const schema = store.getters[`schema/object`] as Swagger

        const generateBasicColumns = () => {
            Object.entries(schema.paths).forEach(([pathKey, path]) => {
                if (path.get?.operationId === props.operationId) {
                    state.api = pathKey
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
                                state.options = Object.entries(target.properties).map(
                                    ([name, item]) => ({
                                        value: name,
                                        label: item.description
                                    })
                                )
                                state.fields = Object.entries(target.properties).map(
                                    ([name, item]) => ({
                                        dataIndex: name,
                                        title: item.description
                                    })
                                )
                            }
                        } else if (data.type === undefined) {
                            // @ts-ignore
                            const schemaName = data.originalRef
                            const target = schema.definitions![schemaName]
                            if (target.type === 'object') {
                                state.data = Object.entries(target.properties).map(
                                    ([name, item]) => ({
                                        dataIndex: name,
                                        title: item.description
                                    })
                                )
                                state.options = Object.entries(target.properties).map(
                                    ([name, item]) => ({
                                        value: name,
                                        label: item.description
                                    })
                                )
                                state.fields = Object.entries(target.properties).map(
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
            const { code } = useTable(data, state.layout, state.api)
            state.code = code.value
        })

        const handleSubmit = (code: string) => {
            state.code = code
        }

        const handleReset = () => {
            generateBasicColumns()
        }

        return { ...toRefs(state), handleSubmit, handleReset }
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
                <Tabs>
                    <TabPane key="card" tab="指标卡">
                        <StatisticCard api={this.api} fields={this.fields} onChange={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="table" tab="表格">
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
                    </TabPane>
                    <TabPane key="basicColumn" tab="基础柱状图">
                        <BasicColumn fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="multiple" tab="柱状折线对比图">
                        <Multiple fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="basicLine" tab="基础折线图">
                        <BasicLine fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="basicArea" tab="基础面积图">
                        <BasicArea fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="donut" tab="环形图">
                        <Donut fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="stackArea" tab="层叠面积图">
                        <StackArea fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="stackColumn" tab="层叠柱状图">
                        <StackColumn fieldOptions={this.options} onSubmit={this.handleSubmit} />
                    </TabPane>
                </Tabs>
                <MonacoEditor value={this.code} />
            </>
        )
    }
})
