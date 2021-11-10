import template from '@babel/template'
import generate from "@babel/generator"
import { watchEffect } from 'vue'

export const useBasicLine = (fieldDate: string, fieldValue: string, legendName?: string) => {

    const tpl = `            
    import { LegendItem, Chart, ChartParams } from '@antv/f2'
import { thousands, month } from '@/utils/format'

const white = '#FFFFFF'
const black = '#000000'

const primaryColor = '#2D87D9'
const warningColor = '#C8000A'
const tooltipColor = '#404040'
const gridColor = '#E8E8E8'
const lineColor = '#F8BD46'

const chartChain = (chart: Chart) => {
    /**
     * 图例
     */
    const legendItems: LegendItem[] = [
        {
            name: '${legendName}',
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
     * 度量：刻度点数、最小值
     */
    chart.scale('${fieldValue}', {
        tickCount: 5,
        min: 0
    })

    /**
     * 坐标系：时间字段（月份）
     * 坐标系：数值字段（千分位）
     * 提示：自定义样式，千分位，保留两位小数。
     * 图例：底部、居中、自定义文字
     */
    chart
        .axis('${fieldDate}', {
            label: (text, index, total) => {
                let textAlign = 'center'
                if (index === 0) {
                    textAlign = 'start'
                }
                if (index == total - 1) {
                    textAlign = 'end'
                }
                return { text: month(text), textAlign }
            }
        })
        .axis('${fieldValue}', {
            grid: {
                fill: gridColor,
                lineWidth: 1
            },
            label: (text: string) => ({ text: thousands(text) })
        })
        .tooltip({
            showItemMarker: false,
            background: {
                radius: 4,
                fill: tooltipColor,
                padding: [4, 6]
            },
            onShow: ({ items }) => {
                items[0].name = null
                items[0].value = thousands(items[0].value)
                items.splice(1, 1)
            }
        })
        .legend({
            position: isPhone ? 'bottom' : 'top',
            align: isPhone ? 'center' : 'right',
            custom: true,
            items: legendItems
        })

    /**
     * 几何图形：线形，点
     */
    chart.line().position('${fieldDate}*${fieldValue}').color(lineColor)

    chart
        .point()
        .position('${fieldDate}*${fieldValue}')
        .style({
            fill: white,
            stroke: '#ECEDF4',
            lineWidth: 2
        })
        .size(3)
}

            `
    return tpl
}
