import template from '@babel/template'
import generate from "@babel/generator"
import { watchEffect } from 'vue'

export const useStackColumn = (fieldName: string, fieldValue: string, fieldCategory?: string,) => {

    const tpl = `            
    import { Chart, ChartParams, LegendItem, AxisLabelParams, Data, DataRecord } from '@antv/f2'
    import { thousands, month } from '@/utils/format'
    
    const primaryColor = '#2D87D9'
    const warningColor = '#C8000A'
    const tooltipColor = '#404040'
    const gridColor = '#E8E8E8'
    const lineColor = '#F8BD46'
    
    const fieldName = ''
    const fieldValue = ''
    const fieldCategory = ''
    
    const isMobile = true
    
    const chartChain = (chart: Chart) => {
    
    
        /**
         * 坐标系：时间字段（位置、月份）
         * 坐标系：数值字段（千分位）
         * 提示：自定义样式，千分位，保留两位小数。
         * 图例：底部、居中、自定义文字
         */
        chart
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
                position: isMobile ? 'bottom' : 'top',
                align: isMobile ? 'center' : 'right',
                itemWidth: 50,
                marker: 'square'
            })
        
        /**
         * 几何图形：柱形，颜色，宽度，层叠类型
         */
        chart.interval()
            .position('${fieldName}*${fieldValue}')
            .color('${fieldCategory}', ['#F8BD46', '#3FD17C', '#2D87D9'])
            .size(20)
            .adjust('stack')
    }
            `
    return tpl
}
