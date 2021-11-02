import { defineComponent, watch, watchEffect, PropType } from 'vue'
import { useMonacoEditor } from '../composables'

export const MonacoEditorProps = {
    value: String,
    language: String as PropType<'typescript'>
}

const MonacoEditor = defineComponent({
    props: MonacoEditorProps,
    setup(props, { emit }) {
        const { container, editor, value } = useMonacoEditor({
            value: props.value,
            language: props.language || 'typescript'
        })

        // watch(
        //     () => props.value,
        //     (propsValue, prevPropsValue) => {
        //         if (propsValue != value.value) {
        //             editor.value.setValue(propsValue)
        //         }
        //     }
        // )

        watchEffect(() => {
            editor.value && editor.value.setValue(props.value || '')
        })

        // watch(value, (value) => {
        //     emit('update:value', value)
        // })

        watchEffect(() => {
            emit('update:value', value.value)
        })

        return () => <div ref={container} style="width:100%;height:650px" />
    }
})

export default MonacoEditor
