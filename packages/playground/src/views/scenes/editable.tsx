import { defineComponent, reactive, watchEffect, toRefs, PropType } from 'vue'
import { useStore } from 'vuex'
import { Card, Table, Input, Checkbox, Select, Button } from 'ant-design-vue'
import { tableProps } from 'ant-design-vue/es/table/interface'
import { omit, cloneDeep } from 'lodash-es'
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
        dataIndex: 'color',
        title: '颜色',
        customRender: ({ text, record, index, column }) => (
            <Checkbox
                v-model={[record.color, 'checked']}
                onChange={(e) => {
                    if (!e.target.checked) {
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
                v-model={[record.arrow, 'checked']}
                onChange={(e) => {
                    if (!e.target.checked) {
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
                v-model={[record.layout, 'value']}
                onChange={(value, option) => {
                    if (!value || value === 'display') {
                        delete record.layout
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
        value: Array as PropType<Record<string, any>>,
        columns: Array as PropType<Column[]>,
        onReset: Function as PropType<() => void>
    },
    setup(props, { emit }) {
        const store = useStore()

        const state = reactive<{
            data: Column[]
            code: string,
            layout: 'horizontal' | 'vertical'
        }>({
            data: cloneDeep(props.value),
            code: '',
            layout: 'horizontal'
        })


        watchEffect(() => {
            const data = state.data
                .filter(item => item.show)
                .map(item => omit(item, 'show')
                )
            emit('update:value', data)
        })

        const handleReset = () => {
            emit('reset')
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
            </>
        )
    }
})
