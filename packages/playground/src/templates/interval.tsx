import { LegendItem, Chart, ChartParams } from '@antv/f2'
import { thousands } from '@/utils/format'
import dayjs from 'dayjs'

const primaryColor = '#2D87D9'
const warningColor = '#C8000A'
const tooltipColor = '#404040'
const gridColor = '#E8E8E8'

const legendName = ''
const fieldA = ''
const fieldB = ''

const isMobile = true

const legendItems: LegendItem[] = [
    {
        name: `legendName`,
        marker: 'square',
        fill: primaryColor
    }
]

const chartChain = (chart: Chart) => {
    /**
     * 坐标系：时间字段（月份）
     * 坐标系：数值字段（千分位）
     * 提示：自定义样式，千分位，保留两位小数。
     * 图例：底部、居中、自定义文字
     */
    chart
        .axis(`fieldA`, {
            label: (text) => {
                const month = String(dayjs(text).month() + 1).padStart(2, '0')
                return { text: `${month}月` }
            }
        })
        .axis(`fieldB`, {
            grid: {
                fill: gridColor,
                lineWidth: 1
            },
            label: (text) => ({ text: thousands(text) })
        })
        .tooltip({
            showItemMarker: false,
            background: {
                radius: 4,
                fill: tooltipColor,
                padding: [5, 6]
            },
            onShow: ({ items }) => {
                items[0].name = null
                items[0].value = thousands(items[0].value, true)
            }
        })
        .legend({
            position: isMobile ? 'bottom' : 'top',
            align: isMobile ? 'center' : 'right',
            custom: true,
            items: legendItems
        })

    /**
     * 几何图形：柱状图，字段，颜色，宽度
     */
    chart
        .interval()
        .position(`fieldA*fieldB`)
        .color((value: number) => (value >= 0 ? primaryColor : warningColor))
        .size(20)
}
