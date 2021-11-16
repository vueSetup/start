import { defineComponent, reactive, watchEffect, ref, toRefs, PropType } from 'vue'
import { useStore } from 'vuex'
import { Card, Table, Input, Checkbox, Select, Button, Form, FormItem, InputNumber } from 'ant-design-vue'
import { omit, cloneDeep } from 'lodash-es'
import { MonacoEditor } from '@/components'
import { useCard } from './useCard'
import { Swagger } from '@runes/openapi'

const { useForm } = Form

export type Field = {
    dataIndex: string
    title?: string
    showColor?: boolean
    showArrow?: boolean
    show?: boolean
}

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
    }
]

export default defineComponent({
    props: {
        api: {
            type: String,
            default: '/api'
        },
        fields: Array as PropType<Field[]>,
        onChange: Function as PropType<(code: string) => void>
    },
    setup(props, { emit }) {

        const code = ref<string>('')

        const modelRef = reactive({
            title: '',
            unit: '',
            md: 12,
            data: cloneDeep(props.fields)
        })
        const rulesRef = reactive({})

        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)

        watchEffect(() => {
            const data = modelRef.data.filter((item) => item.show).map((item) => omit(item, 'show'))
            const { code } = useCard(props.api, data, modelRef.title, modelRef.unit, modelRef.md)
            emit('change', code)
        })

        return { modelRef, validateInfos, resetFields }
    },
    render() {
        return (
            <>
                {JSON.stringify(this.modelRef)}
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                >
                    <FormItem label="指标名称" {...this.validateInfos.title}>
                        <Input v-model={[this.modelRef.title, 'value']} allowClear />
                    </FormItem>
                    <FormItem label="单位" {...this.validateInfos.unit}>
                        <Input v-model={[this.modelRef.unit, 'value']} allowClear />
                    </FormItem>
                    <FormItem label="栅格(平板)" {...this.validateInfos.md}>
                        <InputNumber v-model={[this.modelRef.md, 'value']} style={{ width: '100%' }} />
                    </FormItem>
                    <FormItem label="字段" {...this.validateInfos.data}>
                        <Table
                            size="middle"
                            columns={columns}
                            dataSource={this.modelRef.data}
                            pagination={false}
                        />
                    </FormItem>

                    <FormItem wrapperCol={{ span: 10, offset: 4 }}>
                        <Button onClick={this.resetFields} style={{ marginLeft: '10px' }}>重置</Button>
                    </FormItem>
                </Form>
            </>
        )
    }
})
