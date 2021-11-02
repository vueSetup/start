import { defineComponent, PropType, reactive, toRefs, watch, FunctionalComponent } from 'vue'
import { Skeleton, Icon } from 'vant'
import { isEqual } from "lodash-es"
import './index.less'

export interface ColProps {
    title: string;
    dataIndex: string;
    color?: boolean;
    arrow?: boolean;
    layout?: string;
}
interface TableProps {
    layout: 'horizontal' | 'vertical',
    columns: ColProps[],
    dataSource: Record<string, any>[],
    loading: boolean
}
const Table: FunctionalComponent<TableProps> = ({ layout = 'horizontal', columns, dataSource, loading }) => {
    const theadDom =
        layout === 'horizontal' ? (
            <thead>
                <tr class="van-horizontal-table-tr van-horizontal-table-tr-first">
                    {columns.map((column) => (
                        <th>{column.title}</th>
                    ))}
                </tr>
            </thead>
        ) : null

    const valueRender = (column: ColProps, value: string) => {
        if (!value) return <span>-</span>
        const arrowDom =
            column.arrow && parseFloat(value) != 0 ? (
                <Icon
                    name="play"
                    size="6"
                    style={{
                        marginRight: '2px',
                        transform: parseFloat(value) > 0 ? 'rotate(270deg)' : 'rotate(90deg)'
                    }}
                />
            ) : null

        const textDom = !column.arrow
            ? value
            : (value.startsWith('+') || value.startsWith('-')) && value.endsWith('%')
                ? value.slice(1, -1)
                : !(value.startsWith('+') || value.startsWith('-')) && value.endsWith('%')
                    ? value.slice(0, -1)
                    : (value.startsWith('+') || value.startsWith('-')) && !value.endsWith('%')
                        ? value.slice(1)
                        : value

        return (
            <span
                style={{
                    color: column.color ?
                        parseFloat(value) > 0
                            ? '#3FD17C'
                            : parseFloat(value) < 0
                                ? '#FA0000'
                                : '#000'
                        : '#000'
                }}>
                {arrowDom}
                {textDom}
            </span>
        )
    }
    const tdRender = (column: ColProps, item?: Record<string, any>) => {
        if (column.layout && column.layout !== layout) return null

        return (
            <td class={{ ['van-vertical-table-td']: layout === 'vertical' }}>
                {item ? valueRender(column, item[column.dataIndex]) : column.title}
            </td>
        )
    }

    const tbodyDom =
        layout === 'horizontal' ? (
            <tbody>
                {dataSource.map((item) => (
                    <tr class="van-horizontal-table-tr">
                        {columns.map((column) => tdRender(column, item))}
                    </tr>
                ))}
            </tbody>
        ) : (
            <tbody>
                {columns.map((column) => (
                    <tr class="van-vertical-table-tr">
                        {tdRender(column)}
                        {dataSource.map((item) => tdRender(column, item))}
                    </tr>
                ))}
            </tbody>
        )

    return (
        <Skeleton loading={loading} row={4}>
            <table class="van-table">
                {theadDom}
                {tbodyDom}
            </table>
        </Skeleton>
    )
}

export default Table
