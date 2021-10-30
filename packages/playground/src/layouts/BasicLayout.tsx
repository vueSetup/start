import { defineComponent } from 'vue'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from 'ant-design-vue'
import { BaseMenu } from '@/components'
import { RouterView } from 'vue-router'

import 'ant-design-vue/dist/antd.less'

export default defineComponent({
    setup() {
        return () => (
            <Layout>
                <LayoutHeader style={{ height: '48px' }}>Header</LayoutHeader>
                <Layout style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '6px' }}>
                    <LayoutSider
                        style={{ width: '200px' }}
                    >
                        <BaseMenu />
                    </LayoutSider>
                    <Layout style={{ margin: "0 18px" }}>
                        <LayoutContent>
                            <RouterView />
                        </LayoutContent>
                        <LayoutFooter>Footer</LayoutFooter>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
})
