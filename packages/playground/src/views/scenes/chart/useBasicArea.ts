import template from '@babel/template'
import generate from "@babel/generator"
import { watchEffect } from 'vue'

export const useBasicArea = (fieldDate: string, fieldValue: string) => {

    const tpl = `            
    const options: ChartParams = {
        height: isPhone ? 300 : 150
    }
    
    const gridColor = '#E8E8E8'
    const lineColor = 'l(90) 0:#1890FF 1:#f7f7f7'
    const areaColor = 'l(90) 0:#1890FF 1:#f7f7f7'
    
    const chartChain = (chart: Chart, data: Data<DataRecord>) => {
        const labels = getLabels(data, params.dateType)
        /**
         * 度量：刻度点数、最小值
         */
        chart.scale('value', {
            tickCount: 5,
            min: 0
        })
        /**
         * 坐标轴
         */
        chart.axis('${fieldDate}', {
            label: (text, index, total) => {
                const textCfg: AxisLabelParams = {}
                if (index === 0) {
                    textCfg.textAlign = 'left'
                } else if (index === total - 1) {
                    textCfg.textAlign = 'right'
                }
                if (labels.includes(text)) {
                    if (params.dateType === 'month' || params.dateType === 'quarterly') {
                        textCfg.text = monthDay(text)
                    }
                    if (params.dateType === 'halfYear' || params.dateType === 'year') {
                        textCfg.text = month(text)
                    }
                } else {
                    textCfg.text = null
                }
                return textCfg
            }
        })
        chart.axis('${fieldValue}', {
            grid: {
                fill: gridColor,
                lineWidth: 1
            },
            label: (text) => ({ text: thousands(text) + '(美元)' })
        })
        /**
         * 提示信息
         */
        chart.tooltip({
            showCrosshairs: true,
            showTitle: true,
            titleStyle: {
                fontSize: 9,
                fill: '#ffffff'
            },
            nameStyle: {
                fontSize: 9,
                fill: '#ffffff'
            },
            valueStyle: {
                fontSize: 9,
                fill: '#ffffff'
            },
            background: {
                radius: 4,
                fill: '#000',
                fillOpacity: 0.75,
                padding: isPhone ? [14, 14, 8, 8] : [9, 34, 17, 17]
            },
            onShow: ({ items }) => {
                items[0].title = localDay(items[0].title)
                items[0].name = '收盘价'
                items[0].value = thousands(items[0].value, true) + '美元/股'
            }
        })
    
        /**
         * 几何图形：面积，折线
         */
        chart
            .area()
            .position('${fieldDate}*${fieldValue}')
            .color(areaColor)
        chart
            .line()
            .position('${fieldDate}*${fieldValue}')
            .color(lineColor)
    }
            `
    return tpl
}
