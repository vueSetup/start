import { Chart, ChartParams, LegendItem, AxisLabelParams } from '@antv/f2'
import { thousands, localDate } from '@/utils/format'

const gridColor = '#E8E8E8'
const lineColor = 'l(90) 0:#1890FF 1:#f7f7f7'
const areaColor = 'l(90) 0:#1890FF 1:#f7f7f7'

const fieldDate = ''
const fieldValue = ''

const isMobile = true

const chartChain = (chart: Chart) => {
    // chart.scale('value', {
    //     tickCount: 5,
    //     min: 0
    // })
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
                if (datetype === 'month' || datetype === 'quarterly') {
                    textCfg.text = moment(text).format('MM.DD')
                }
                if (datetype === 'halfYear' || datetype === 'year') {
                    textCfg.text = `${moment(text).format('MM')}月`
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
        label: (text) => ({ text: `${thousands(text)} (美元)` })
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
            padding: isMobile ? [14, 14, 8, 8] : [9, 34, 17, 17]
        },
        onShow: ({ items }) => {
            items[0].title = localDate(items[0].title)
            items[0].name = '价格'
            items[0].value = `${thousands(items[0].value, true)}美元/股 `
        }
    })

    /**
     * 几何图形：面积，折线
     */
    chart.area()
        .position('${fieldDate}*${fieldValue}')
        .color(areaColor)
    chart.line()
        .position('${fieldDate}*${fieldValue}')
        .color(lineColor)
}
