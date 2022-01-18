import { defineComponent } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { BaseMenu } from '@/components'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

export default defineComponent({
    setup() {
        return () => (
            <Layout>
                <LayoutHeader style={{ height: '48px' }}>
                    <RouterLink to="/welcome">Header</RouterLink>
                </LayoutHeader>
                <Layout style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '6px' }}>
                    <LayoutSider width="260px">
                        <BaseMenu />
                    </LayoutSider>
                    <Layout style={{ margin: '0 18px' }}>
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
