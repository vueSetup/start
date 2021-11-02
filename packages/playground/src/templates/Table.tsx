import { Table } from 'ant-design-vue'

const source = `
const columsn = [
]

<Table columsn={columsn}/>
`

const columsn = [
    { dataIndex: 'dataTime', title: '日期' },
    { dataIndex: 'lastYear', title: '上年同期' },
    { dataIndex: 'month', title: '月份' },
    { dataIndex: 'orgName', title: '组织名称' },
    { dataIndex: 'value', title: '本月实际' },
    { dataIndex: 'yoyc', title: '年累计同比' }
]

<Table columsn={columsn}/>