import { defineComponent, reactive, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Card, Tabs, TabPane, Input, Checkbox, Select, Button } from 'ant-design-vue'
import { MonacoEditor } from '@/components'
import { Swagger } from '@lola/openapi'
import { BasicColumn, Multiple, BasicLine, BasicArea, Donut, StackArea, StackColumn } from './scenes/chart'


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
        const handleSubmit = (code: string) => {
            state.code = code
        }


        const handleReset = () => {
            generateBasicColumns()
        }

        return { ...toRefs(state), handleSubmit, handleReset }
    },
    render() {
        return (
            <>
                <Tabs>
                    <TabPane key="basicColumn" tab="基础柱状图">
                        <BasicColumn fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="multiple" tab="柱状折线对比图">
                        <Multiple fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="basicLine" tab="基础折线图">
                        <BasicLine fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="basicArea" tab="基础面积图">
                        <BasicArea fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="donut" tab="环形图">
                        <Donut fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="stackArea" tab="层叠面积图">
                        <StackArea fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                    <TabPane key="stackColumn" tab="层叠柱状图">
                        <StackColumn fieldOptions={this.data} onSubmit={this.handleSubmit} />
                    </TabPane>
                </Tabs>
                <MonacoEditor value={this.code} />
            </>
        )
    }
})
