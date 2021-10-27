import { defineComponent, ref, onBeforeMount, watchEffect } from 'vue'
import { useTransform } from '../composables'

import './HelloWorld.less'

export default defineComponent({
    props: {
        msg: String
    },
    setup(props) {
        const count = ref(0)

        const { code } = useTransform('月数据生产指标出参对象')

        watchEffect(() => {
            code.value && console.log(code.value)
        })

        return () => (
            <>
                <h1>{props.msg}</h1>
                <p>
                    Recommended IDE setup:
                    <a href="https://code.visualstudio.com/" target="_blank">
                        VSCode
                    </a>
                    +
                    <a href="https://github.com/johnsoncodehk/volar" target="_blank">
                        Volar
                    </a>
                </p>

                <p>
                    See <code>README.md</code> for more information.
                </p>

                <p>
                    <a href="https://vitejs.dev/guide/features.html" target="_blank">
                        Vite Docs
                    </a>
                    |
                    <a href="https://v3.vuejs.org/" target="_blank">
                        Vue 3 Docs
                    </a>
                </p>

                <button
                    type="button"
                    onClick={() => {
                        count.value++
                    }}
                >
                    count is: {count.value}
                </button>
                <p>
                    Edit
                    <code>components/HelloWorld.vue</code> to test hot module replacement.
                </p>
            </>
        )
    }
})
