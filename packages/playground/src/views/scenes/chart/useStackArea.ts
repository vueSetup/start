import template from '@babel/template'
import generate from "@babel/generator"
import { watchEffect } from 'vue'

export const useStackArea = (fieldDate: string, fieldValue: string, fieldCategory: string,) => {

    const tpl = `            
    import { Chart, ChartParams, LegendItem, AxisLabelParams, Data, DataRecord } from '@antv/f2'
    import { thousands, month } from '@/utils/format'

    const primaryColor = '#2D87D9'
    const warningColor = '#C8000A'
    const tooltipColor = '#404040'
    const gridColor = '#E8E8E8'
    const lineColor = '#F8BD46'

    function marker(x, y, r, ctx) {
        ctx.lineWidth = 1
        ctx.strokeStyle = ctx.fillStyle
        ctx.moveTo(x - r - 3, y)
        ctx.lineTo(x + r + 3, y)
        ctx.stroke()
        ctx.arc(x, y, r, 0, Math.PI * 2, false)
        ctx.fill()
    }

    const chartChain = (chart: Chart) => {

        /**
         * 坐标系：时间字段（位置、月份）
         * 坐标系：数值字段（千分位）
         * 提示：自定义样式，千分位，保留两位小数。
         * 图例：底部、居中、自定义文字
         */
        chart
            .axis('${fieldDate}', {
                label: (text, index, total) => {
                    let textAlign = 'center'
                    if (index === 0) {
                        textAlign = 'left'
                    } else if (index === total - 1) {
                        textAlign = 'right'
                    }
                    return { text: month(text), textAlign }
                }
            })
            .axis('${fieldValue}', {
                grid: {
                    fill: gridColor,
                    lineWidth: 1
                },
                label: (text: number) => ({ text: thousands(text) })
            })
            .tooltip({
                showCrosshairs: true,
                showItemMarker: false,
                background: {
                    radius: 4,
                    fill: tooltipColor,
                    padding: [5, 6]
                },
                onShow: ({ items }) => {
                    items.forEach(item => {
                        item.value = thousands(item.value, true)
                    })
                }
            })
            .legend({
                position: isPhone ? 'bottom' : 'top',
                align: isPhone ? 'center' : 'right',
                itemWidth: 50,
                marker
            })

        /**
         * 几何图形：面积\折线，颜色，调整数据类型：层叠类型
         */
        chart.area()
            .position('${fieldDate}*${fieldValue}')
            .color('${fieldCategory}', ['#EE8301', '#F6BE34', '#3783CE'])
            .adjust('${fieldCategory}')
        chart.line()
            .position('${fieldDate}*${fieldValue}')
            .color('${fieldCategory}', ['#EE8301', '#F6BE34', '#3783CE'])
            .adjust('stack')
    }
            `
    return tpl
}
