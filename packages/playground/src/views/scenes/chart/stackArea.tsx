import { defineComponent, PropType, toRefs, reactive, ref, watchEffect } from 'vue'
import { Form, FormItem, Button, InputNumber, Select } from 'ant-design-vue'
import { useStackArea } from './useStackArea'

const { useForm } = Form

export default defineComponent({
    props: {
        fieldOptions: Array as PropType<Array<{ value: string; label?: string; }>>,
        onSubmit: Function as PropType<(code: string) => void>
    },
    setup(props, { emit }) {
        const code = ref<string>('')

        const modelRef = reactive({
            mobileHeight: 300,
            padHeight: 150,
            fieldName: '',
            fieldValue: '',
            fieldCategory: ''
        })
        const rulesRef = reactive({
            mobileHeight: [{
                required: true
            }],
            padHeight: [{
                required: true
            }],
            fieldName: [{
                required: true
            }],
            fieldValue: [{
                required: true
            }],
            fieldCategory: [{
                required: true
            }]
        })
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)

        const onSubmit = () => {
            emit('submit', code.value)
        }
        watchEffect(() => {
            code.value = useStackArea(modelRef.fieldName, modelRef.fieldValue, modelRef.fieldCategory)
        })
        return { modelRef, validateInfos, resetFields, onSubmit }
    },
    render() {
        return (
            <>
                {JSON.stringify(this.modelRef)}
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                >
                    <FormItem label="高度（手机）" {...this.validateInfos.mobileHeight}>
                        <InputNumber v-model={[this.modelRef.mobileHeight, 'value']} style={{ width: '100%' }} />
                    </FormItem>
                    <FormItem label="高度（平板）" {...this.validateInfos.padHeight}>
                        <InputNumber v-model={[this.modelRef.padHeight, 'value']} style={{ width: '100%' }} />
                    </FormItem>
                    <FormItem label="x轴" {...this.validateInfos.fieldName}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldName, 'value']} />
                    </FormItem>
                    <FormItem label="y轴" {...this.validateInfos.fieldValue}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldValue, 'value']} />
                    </FormItem>
                    <FormItem label="类别" {...this.validateInfos.fieldCategory}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldCategory, 'value']} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 10, offset: 4 }}>
                        <Button type="primary" onClick={this.onSubmit}>保存</Button>
                        <Button onClick={this.resetFields} style={{ marginLeft: '10px' }}>重置</Button>
                    </FormItem>
                </Form>
            </>
        )
    }
})
