import { defineComponent, PropType, toRefs, reactive, toRaw } from 'vue'
import { Form, FormItem, Input, InputNumber, Select } from 'ant-design-vue'

const { useForm } = Form

export default defineComponent({
    props: {
        fieldOptions: Array as PropType<Array<{ value: string; label?: string; }>>
    },
    setup(props) {
        const modelRef = reactive({
            mobileHeight: 300,
            padHeight: 144,
            fieldDate: '',
            fieldInterval: '',
            fieldLine: '',
            legendNameInterval: '',
            legendNameLine: ''
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
            fieldInterval: [{
                required: true
            }],
            fieldLine: [{
                required: true
            }],
            legendNameInterval: [{
                required: true
            }],
            legendNameLine: [{
                required: true
            }]
        })
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
            onValidate: (...args) => console.log(...args),
        });
        const onSubmit = () => {
            validate()
                .then(() => {
                    console.log(toRaw(modelRef));
                })
                .catch(err => {
                    console.log('error', err);
                });
        };
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
                    <FormItem label="y轴-柱状图" {...this.validateInfos.fieldInterval}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldInterval, 'value']} />
                    </FormItem>
                    <FormItem label="图例-柱状图" {...this.validateInfos.legendNameInterval}>
                        <Input v-model={[this.modelRef.legendNameInterval, 'value']} allowClear />
                    </FormItem>
                    <FormItem label="y轴-折线图" {...this.validateInfos.fieldLine}>
                        <Select options={this.fieldOptions} v-model={[this.modelRef.fieldLine, 'value']} />
                    </FormItem>
                    <FormItem label="图例-折线图" {...this.validateInfos.legendNameLine}>
                        <Input v-model={[this.modelRef.legendNameLine, 'value']} allowClear />
                    </FormItem>
                </Form>
            </>
        )
    }
})
