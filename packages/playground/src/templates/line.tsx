import { LegendItem, Chart, ChartParams } from '@antv/f2'
import { thousands, month, monday } from '@/utils/format'

const white = '#FFFFFF'
const black = '#000000'

const primaryColor = '#2D87D9'
const warningColor = '#C8000A'
const tooltipColor = '#404040'
const gridColor = '#E8E8E8'
const lineColor = 'l(90) 0:#1890FF 1:#f7f7f7'

const legendName = ''
const fieldDate = ''
const fieldValue = ''

const isMobile = true

const chartChain = (chart: Chart) => {
    /**
     * 图例
     */
    const legendItems: LegendItem[] = [
        {
            name: 'legendName',
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
            label: (text, index, total) => {
                let textAlign = 'center'
                if (index === 0) {
                    textAlign = 'start'
                }
                if (index == total - 1) {
                    textAlign = 'end'
                }
                return { text: monday(text), textAlign }
            }
        })
        .axis(`fieldValue`, {
            grid: {
                fill: gridColor,
                lineWidth: 1,
                lineDash: null
            },
            label: (text) => ({ text: thousands(text) })
        })
        .tooltip({
            showCrosshairs: true,
            showTitle: true,
            nameStyle: {
                fontSize: 9,
                fill: white
            },
            valueStyle: {
                fontSize: 9,
                fill: white
            },
            titleStyle: {
                fontSize: 9,
                fill: white
            },
            background: {
                radius: 4,
                fill: black,
                fillOpacity: 0.75,
                padding: [9, 34, 17, 17]
            },
            onShow: ({ items }) => {
                items[0].name = legendItems[0].name
                items[0].value = thousands(items[0].value)
                items.splice(1, 1)
            }
        })
        .legend({
            position: isMobile ? 'bottom' : 'top',
            align: isMobile ? 'center' : 'right',
            custom: true,
            items: legendItems
        })
        .scale('fieldValue', {
            tickCount: 5,
            min: 0
        })

    /**
     * 度量：syncY => 对齐
     */
    chart.scale('fieldValue', {
        tickCount: 5,
        min: 0
    })

    /**
     * 几何图形：线形
     */
    chart.line().position('fieldDate*fieldValue').color(lineColor)

    chart
        .point()
        .position('fieldDate*fieldValue')
        .style({
            fill: white,
            stroke: '#ECEDF4',
            lineWidth: 2
        })
        .size(3)
}
