import { defineComponent, isReactive, isRef, PropType, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { Table } from 'ant-design-vue'
import { Swagger } from '@runes/openapi'

export default defineComponent({
    props: {
        name: String
    },
    setup(props) {
        const colums = []

        const store = useStore()

        const state = reactive<{
            schemaObject: Record<string, any> | null
            title: string
            columns: Array<any>
        }>({
            schemaObject: null,
            title: '',
            columns: []
        })

        watchEffect(() => {
            const schema = store.getters[`schema\object`] as Swagger
            if (schema.definitions && props.name) {
                const definition = schema.definitions[props.name]
            }
        })

        return () => (
            <Table bordered size="middle" title={state.title} columns={state.columns}></Table>
        )
    }
})
