import { defineComponent } from 'vue'
import { Form, FormItem, Input, InputNumber } from 'ant-design-vue'

export default defineComponent({
    setup() {
        return () => (
            <Form>
                <FormItem label="图例">
                    <Input />
                </FormItem>
                <FormItem label="高度（手机）">
                    <InputNumber />
                </FormItem>
                <FormItem label="高度（平板）">
                    <InputNumber />
                </FormItem>
            </Form>
        )
    }
})
