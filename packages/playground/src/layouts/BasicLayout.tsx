import { defineComponent } from 'vue'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from 'ant-design-vue'
import { BaseMenu } from '@/components'
import { RouterView } from 'vue-router'

import 'ant-design-vue/dist/antd.less'

export default defineComponent({
    setup() {
        return () => (
            <Layout>
                <LayoutHeader>header</LayoutHeader>
                <LayoutSider>
                    <BaseMenu />
                </LayoutSider>
                <LayoutContent>
                    <RouterView />
                </LayoutContent>
                <LayoutFooter>right sidebar</LayoutFooter>
            </Layout>
        )
    }
})
