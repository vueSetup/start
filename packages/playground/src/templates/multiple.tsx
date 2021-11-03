import { LegendItem, Chart, ChartParams } from '@antv/f2'
import { thousands, month } from '@/utils/format'

const primaryColor = '#2D87D9'
const warningColor = '#C8000A'
const tooltipColor = '#404040'
const gridColor = '#E8E8E8'
const lineColor = '#F8BD46'

const legendIntervalName = ''
const legendLineName = ''

const fieldDate = ''
const fieldInterval = ''
const fieldLine = ''

const isMobile = true

export const chartChain = (chart: Chart) => {
    /**
     * 图例
     */
    const legendItems: LegendItem[] = [
        {
            name: `legendIntervalName`,
            marker: 'square',
            fill: primaryColor
        },
        {
            name: 'legendLineName',
            marker: function marker(x, y, r, ctx) {
                ctx.lineWidth = 1
                ctx.strokeStyle = ctx.fillStyle
                ctx.moveTo(x - r - 3, y)
                ctx.lineTo(x + r + 3, y)
                ctx.stroke()
                ctx.arc(x, y, r, 0, Math.PI * 2, false)
                ctx.fill()
            },
            fill: lineColor
        }
    ]

    /**
     * 坐标系：时间字段（月份）
     * 坐标系：数值字段（千分位）
     * 提示：自定义样式，千分位，保留两位小数。
     * 图例：底部、居中、自定义文字
     */
    chart
        .axis(`fieldDate`, {
            label: (text) => {
                return { text: month(text) }
            }
        })
        .axis(`fieldInterval`, {
            grid: {
                fill: gridColor,
                lineWidth: 1
            },
            label: (text) => ({ text: thousands(text) })
        })
        .axis(`fieldLine`, false)
        .tooltip({
            showItemMarker: false,
            background: {
                radius: 4,
                fill: tooltipColor,
                padding: [5, 6]
            },
            onShow: ({ items }) => {
                if (isMobile) {
                    items[0].name = null
                    items[0].value = thousands(items[0].value, true)
                    items.splice(1, 2)
                } else {
                    items[0].name = legendItems[0].name
                    items[0].value = thousands(items[0].value)
                    items[1].name = legendItems[1].name
                    items[1].value = thousands(items[1].value)
                    items.splice(2)
                }
            }
        })
        .legend({
            position: isMobile ? 'bottom' : 'top',
            align: isMobile ? 'center' : 'right',
            itemWidth: 50,
            custom: true,
            items: legendItems
        })

    /**
     * 度量：syncY => 对齐
     */
    chart.scale('fieldInterval', {
        min: 0
    })
    chart.scale('fieldLine', {
        min: 0
    })

    /**
     * 几何图形：柱状，线形，点
     */
    chart
        .interval()
        .position('fieldDate*fieldInterval')
        .color(`fieldInterval`, (value: number) => value >= 0 ? primaryColor : warningColor)
        .size(20)

    chart.line().position('fieldDate*fieldLine').color(lineColor)

    chart
        .point()
        .position('fieldDate*fieldLine')
        .style({
            fill: '#FFFFFF',
            stroke: '#ECEDF4',
            lineWidth: 2
        })
        .size(3)
}
