import { shallowReactive, onMounted, onBeforeUnmount, toRefs } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'


export const useMonacoEditor = (
    options?: monaco.editor.IStandaloneEditorConstructionOptions,
    override?: monaco.editor.IEditorOverrideServices
) => {
    const state = shallowReactive<{
        loading: boolean,
        container: HTMLElement | null
        editor: monaco.editor.IStandaloneCodeEditor | null,
        value: string
    }>({
        loading: true,
        container: null,
        editor: null,
        value: ""
    })

    onMounted(() => {
        const container = state.container

        if (container === null)
            throw new Error(`The Monaco Editor's container wasn't mounted.`)

        const editor = monaco.editor.create(
            container,
            options,
            override
        )

        editor.onDidChangeModelContent((e: monaco.editor.IModelContentChangedEvent) => {
            state.value = editor.getValue()
        })

        state.editor = editor
    })

    onBeforeUnmount(() => {
        const editor = state.editor
        if (editor) {
            const model = editor.getModel()
            if (model) {
                model.dispose()
            }
            editor.dispose()
        }
    })

    return { ...toRefs(state) }
}
