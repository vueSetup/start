import { defineComponent, isReactive, isRef, PropType, reactive } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import { Menu, SubMenu, MenuItem } from 'ant-design-vue'
import { Swagger } from '@lola/openapi'

export interface MenuItemData {
    key: string
    title: string
    children: MenuItemData[]
}

export default defineComponent({
    setup() {
        const store = useStore()

        const state = reactive<{
            menus: MenuItemData[]
        }>({
            menus: []
        })

        store.watch(
            () => store.getters[`schema/object`],
            (schema: Swagger | null) => {
                if (schema && schema.tags && schema.paths) {
                    const menus: MenuItemData[] = schema.tags.map((tag) => ({
                        key: tag.description,
                        title: tag.name,
                        children: []
                    }))

                    Object.entries(schema.paths).map(([path, item]) => {
                        item.get.tags.map((tag) => {
                            menus
                                .find((menu) => menu.title === tag)
                                ?.children.push({
                                    key: item.get.operationId,
                                    title: item.get.summary,
                                    children: []
                                })
                        })
                    })

                    state.menus = menus
                }
            },
            { deep: true }
        )

        return () => (
            <Menu mode="inline" theme="dark">
                {state.menus.map(({ key, title, children }) => (
                    <SubMenu key={key} title={title}>
                        {children.map(({ key, title }) => (
                            <MenuItem key={key}>
                                <RouterLink to={`/scenes/table/${key}`}>{title}</RouterLink>
                            </MenuItem>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
        )
    }
})
