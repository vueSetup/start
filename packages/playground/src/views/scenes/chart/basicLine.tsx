import { defineComponent, PropType, toRefs, reactive, ref, watchEffect } from 'vue'
import { Form, FormItem, Input, InputNumber, Select } from 'ant-design-vue'
import { useBasicLine } from './useBasicLine'

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
            padHeight: 144,
            fieldDate: '',
            fieldValue: '',
            legendName: ''
        })
        const rulesRef = reactive({
            mobileHeight: [{
                required: true
            }],
            padHeight: [{
                required: true
            }],
            fieldDate: [{
                required: true
            }],
            fieldValue: [{
                required: true
            }],
            legendName: [{
                required: true
            }]
        })
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)

        const onSubmit = () => {
            emit('submit', code.value)
        }
        watchEffect(() => {
            code.value = useBasicLine(modelRef.fieldDate, modelRef.fieldValue, modelRef.legendName)
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
                    <FormItem label="x轴" {...this.validateInfos.fieldDate}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldDate, 'value']} />
                    </FormItem>
                    <FormItem label="y轴" {...this.validateInfos.fieldValue}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldValue, 'value']} />
                    </FormItem>
                    <FormItem label="图例" {...this.validateInfos.legendName}>
                        <Input v-model={[this.modelRef.legendName, 'value']} allowClear />
                    </FormItem>
                </Form>
            </>
        )
    }
})
