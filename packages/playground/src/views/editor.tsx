import { defineComponent, reactive, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Card, Tabs, TabPane, Input, Checkbox, Select, Button } from 'ant-design-vue'
import { MonacoEditor } from '@/components'
import { Swagger } from '@lola/openapi'
import { BasicColumn } from './scenes/chart'


export default defineComponent({
    props: {
        operationId: String
    },
    setup(props) {
        const store = useStore()

        const state = reactive<{
            data: { value: string; label?: string; }[]
            code: string
        }>({
            data: [],
            code: ''
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
                                        value: name,
                                        label: item.description
                                    })
                                )
                            }
                        }
                    }
                }
            })
            console.log(state.data)
        }

        watchEffect(() => {
            generateBasicColumns()
        })

        const handleReset = () => {
            generateBasicColumns()
        }

        return { ...toRefs(state), handleReset }
    },
    render() {
        return (
            <>
                <Tabs>
                    <TabPane key="basicColumn" tab="基础柱状图">
                        <BasicColumn fieldOptions={this.data} />
                    </TabPane>
                </Tabs>
                {/* <MonacoEditor value={this.code} /> */}
            </>
        )
    }
})
