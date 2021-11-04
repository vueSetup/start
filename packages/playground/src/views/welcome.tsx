import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { InputSearch } from 'ant-design-vue'
import { FETCH_DATA } from '@/store/schema/actions'
import request from '@/utils/request'

import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'
import template from '@babel/template'

export default defineComponent({
    setup() {
        const store = useStore()

        onMounted(() => {
            toAST()
        })

        const toAST = () => {
            
        }

        // http://11.11.160.192:48810/v2/api-docs
        const onSearch = async (url: string) => {
            await store.dispatch(`schema/${FETCH_DATA}`)
        }

        return () => (
            <InputSearch
                size="large"
                enter-button
                placeholder="直接点击查询就可以，这是个假的输入框。"
                onSearch={onSearch}
            />
        )
    }
})
